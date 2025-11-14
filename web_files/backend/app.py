from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import joblib
import numpy as np
import pandas as pd
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from collections import Counter
import re

app = Flask(__name__)
CORS(app)


# ===============================
# FUSION ENSEMBLE CLASS
# Required for loading the pickled fusion_ensemble.pkl model
# ===============================
class FusionEnsemble:
    """
    Fusion ensemble that combines multiple model-vectorizer pairs
    Each model gets its own vectorizer
    """
    
    def __init__(self):
        self.models = []
        self.weights = []
        
    def add_model(self, model, vectorizer, weight=1.0):
        """Add a model-vectorizer pair with weight"""
        self.models.append({
            'model': model,
            'vectorizer': vectorizer,
            'weight': weight
        })
        self.weights.append(weight)
        
    def fit(self, X, y):
        """Fit all models with their respective vectorizers"""
        print(f"\nTraining {len(self.models)} models in fusion ensemble...")
        
        for i, model_dict in enumerate(self.models):
            print(f"  [{i+1}/{len(self.models)}] Training...", end=" ", flush=True)
            
            # Transform with this model's vectorizer
            X_vec = model_dict['vectorizer'].fit_transform(X)
            
            # Train this model
            model_dict['model'].fit(X_vec, y)
            
            print(f"✓ Features: {X_vec.shape[1]}")
        
        print("✓ Fusion ensemble training complete!")
        return self
    
    def predict_proba(self, texts):
        """Get probability predictions from all models"""
        all_predictions = []
        
        for model_dict in self.models:
            model = model_dict['model']
            vectorizer = model_dict['vectorizer']
            weight = model_dict['weight']
            
            # Transform with THIS model's vectorizer
            X_vec = vectorizer.transform(texts)
            
            # Get predictions
            if hasattr(model, 'predict_proba'):
                proba = model.predict_proba(X_vec)
            elif hasattr(model, 'decision_function'):
                # For SVM
                decision = model.decision_function(X_vec)
                if decision.ndim == 1:
                    decision = np.column_stack([-decision, decision])
                # Convert to probabilities
                from scipy.special import softmax
                proba = softmax(decision, axis=1)
            else:
                # Fallback: use hard predictions
                pred = model.predict(X_vec)
                proba = np.zeros((len(pred), len(np.unique(pred))))
                proba[np.arange(len(pred)), pred] = 1.0
            
            # Weight the predictions
            all_predictions.append(proba * weight)
        
        # Average weighted predictions
        avg_predictions = np.sum(all_predictions, axis=0) / np.sum(self.weights)
        return avg_predictions
    
    def predict(self, texts):
        """Get class predictions"""
        probas = self.predict_proba(texts)
        return np.argmax(probas, axis=1)

# Resolve paths relative to backend directory
# In Docker: backend is at /app/backend/, ml_model is at /app/ml_model/
# In local: backend is at web_files/backend/, ml_model is at ml_model/
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))

# Check if running in Docker (backend dir is /app/backend)
if BACKEND_DIR.endswith('/app/backend'):
    # Docker environment
    REPO_ROOT = '/app'
else:
    # Local environment
    WEB_FILES_DIR = os.path.dirname(BACKEND_DIR)
    REPO_ROOT = os.path.dirname(WEB_FILES_DIR)

ML_DIR = os.path.join(REPO_ROOT, "ml_model")

# In-memory stats
PREDICTION_COUNTS = {"Stress": 0, "Non-Stress": 0}
RECENT_PREDICTIONS = []  # last 50


def load_fusion_ensemble():
    """Load the fusion ensemble model from ml_model directory"""
    fusion_path = os.path.join(ML_DIR, "models", "fusion_ensemble.pkl")
    label_encoder_path = os.path.join(ML_DIR, "models", "label_encoder.pkl")
    
    if os.path.exists(fusion_path):
        try:
            fusion_model = joblib.load(fusion_path)
            label_encoder = None
            if os.path.exists(label_encoder_path):
                label_encoder = joblib.load(label_encoder_path)
            print(f"✓ Loaded fusion ensemble from: {fusion_path}")
            return fusion_model, label_encoder
        except Exception as e:
            print(f"⚠️ Error loading fusion ensemble: {e}")
    
    return None, None


def load_other_models():
    """Load alternative models if fusion ensemble not available"""
    candidates = [
        os.path.join(ML_DIR, "models", "best_model.pkl"),
        os.path.join(ML_DIR, "models", "publication_model.pkl"),
        os.path.join(ML_DIR, "models", "model_pipeline.pkl"),
    ]
    
    for path in candidates:
        if os.path.exists(path):
            try:
                model = joblib.load(path)
                print(f"✓ Loaded model from: {path}")
                return model
            except Exception as e:
                print(f"⚠️ Error loading {path}: {e}")
                continue
    
    return None


def load_vectorizer():
    """Load vectorizer from ml_model preprocessors"""
    vectorizer_candidates = [
        os.path.join(ML_DIR, "preprocessors", "vectorizers_optimized.pkl"),
        os.path.join(ML_DIR, "preprocessors", "vectorizers.pkl"),
        os.path.join(ML_DIR, "preprocessors", "tfidf_vectorizer.pkl"),
    ]
    
    for path in vectorizer_candidates:
        if os.path.exists(path):
            try:
                vec = joblib.load(path)
                # Handle dict of vectorizers
                if isinstance(vec, dict):
                    # Try to get tfidf_unigram or first available
                    for key in ["tfidf_unigram", "tfidf_bigram", "tfidf_trigram"]:
                        if key in vec:
                            return vec[key]
                    # Fallback to first vectorizer
                    if len(vec) > 0:
                        return next(iter(vec.values()))
                return vec
            except Exception as e:
                print(f"⚠️ Error loading vectorizer from {path}: {e}")
                continue
    
    return None


def build_fallback_pipeline():
    """Build a simple fallback pipeline if no models are found"""
    try:
        # Try to load dataset to fit vectorizer
        dataset_paths = [
            os.path.join(ML_DIR, "stress.csv"),
            os.path.join(REPO_ROOT, "stress.csv"),
        ]
        
        texts = []
        for path in dataset_paths:
            if os.path.exists(path):
                try:
                    df = pd.read_csv(path)
                    # Find text column
                    text_col = None
                    for col in ["text", "clean_text", "post_id", "content"]:
                        if col in df.columns:
                            text_col = col
                            break
                    if text_col is None:
                        # Use first object column
                        obj_cols = [c for c in df.columns if df[c].dtype == "object"]
                        text_col = obj_cols[0] if obj_cols else None
                    
                    if text_col:
                        texts.extend(df[text_col].dropna().astype(str).tolist()[:10000])
                        break
                except Exception as e:
                    print(f"⚠️ Error loading dataset from {path}: {e}")
                    continue
        
        if len(texts) == 0:
            # Use minimal training data
            texts = [
                "I feel calm and relaxed today.",
                "I am overwhelmed and stressed about my work.",
                "Everything is fine and I am doing great.",
                "Panic and anxiety attacks are getting worse.",
                "I feel happy and content with my life.",
                "Work is causing me extreme stress and anxiety.",
            ]
            y = [0, 1, 0, 1, 0, 1]
        else:
            # Try to get labels from dataset
            try:
                df = pd.read_csv(dataset_paths[0])
                label_col = None
                for col in ["label", "target", "class"]:
                    if col in df.columns:
                        label_col = col
                        break
                if label_col:
                    y = df[label_col].values[:len(texts)]
                else:
                    y = [0, 1] * (len(texts) // 2)
            except:
                y = [0, 1] * (len(texts) // 2)
        
        vec = TfidfVectorizer(max_features=5000, ngram_range=(1, 2), min_df=1)
        X = vec.fit_transform(texts)
        clf = LogisticRegression(max_iter=1000, random_state=42)
        clf.fit(X, y)
        
        class PrefitVectorizerWrapper:
            def __init__(self, vectorizer):
                self.vectorizer = vectorizer
            def fit(self, X, y=None):
                return self
            def transform(self, X):
                return self.vectorizer.transform(X)
        
        from sklearn.pipeline import Pipeline as SKPipeline
        pipeline = SKPipeline([("tfidf", PrefitVectorizerWrapper(vec)), ("clf", clf)])
        print("✓ Built fallback pipeline")
        return pipeline
    except Exception as e:
        print(f"⚠️ Error building fallback pipeline: {e}")
        return None


# Load models on startup
print("=" * 70)
print("Loading Mental Stress Detection Models...")
print("=" * 70)

FUSION_MODEL, LABEL_ENCODER = load_fusion_ensemble()
OTHER_MODEL = load_other_models() if FUSION_MODEL is None else None
FALLBACK_PIPELINE = None

if FUSION_MODEL is None and OTHER_MODEL is None:
    print("⚠️ No trained models found, building fallback pipeline...")
    FALLBACK_PIPELINE = build_fallback_pipeline()

print("=" * 70)


def resolve_model():
    """Resolve which model to use for predictions"""
    if FUSION_MODEL is not None:
        return FUSION_MODEL, LABEL_ENCODER, "fusion_ensemble"
    elif OTHER_MODEL is not None:
        return OTHER_MODEL, None, "other_model"
    elif FALLBACK_PIPELINE is not None:
        return FALLBACK_PIPELINE, None, "fallback"
    return None, None, None


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "service": "Mental Stress Detection Backend",
        "health": "/health",
        "predict": "/predict",
        "stats": "/stats",
        "dataset_stats": "/dataset-stats",
        "eda": "/eda",
        "metrics": "/metrics",
        "tests": "/tests",
        "figures": "/figures",
    })


@app.route("/health", methods=["GET"])
def health():
    model, label_encoder, model_type = resolve_model()
    attrs = []
    if model is not None:
        if hasattr(model, "predict"):
            attrs.append("predict")
        if hasattr(model, "predict_proba"):
            attrs.append("predict_proba")
        if hasattr(model, "decision_function"):
            attrs.append("decision_function")
    
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "model_type": model_type,
        "model_attrs": attrs,
        "label_encoder_loaded": label_encoder is not None,
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        text = (data or {}).get("text", "")
        if not text or not str(text).strip():
            return jsonify({"error": "No text provided"}), 400
        
        model, label_encoder, model_type = resolve_model()
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        # Handle fusion ensemble
        if model_type == "fusion_ensemble":
            try:
                pred_idx = model.predict([text])[0]
                proba = model.predict_proba([text])[0]
                
                if label_encoder is not None:
                    pred_label = label_encoder.inverse_transform([pred_idx])[0]
                else:
                    pred_label = str(pred_idx)
                
                confidence = float(proba[pred_idx])
            except Exception as e:
                return jsonify({"error": f"Prediction failed: {str(e)}"}), 500
        
        # Handle sklearn pipeline
        elif hasattr(model, "predict") and hasattr(model, "named_steps"):
            try:
                pred = model.predict([text])[0]
                proba = None
                if hasattr(model, "predict_proba"):
                    proba = model.predict_proba([text])
                
                pred_label = str(pred)
                confidence = 0.5
                if proba is not None:
                    classes = getattr(model.named_steps.get("clf", model), "classes_", None)
                    if classes is not None:
                        idx = list(classes).index(pred)
                        confidence = float(proba[0][idx])
                    else:
                        confidence = float(np.max(proba[0]))
            except Exception as e:
                return jsonify({"error": f"Prediction failed: {str(e)}"}), 500
        
        # Handle other models (dict with model and vectorizer)
        elif isinstance(model, dict):
            try:
                clf = model.get("model") or model.get("classifier")
                vectorizer = model.get("vectorizer")
                if clf is None or vectorizer is None:
                    return jsonify({"error": "Invalid model structure"}), 500
                
                X = vectorizer.transform([text])
                pred = clf.predict(X)[0]
                proba = None
                if hasattr(clf, "predict_proba"):
                    proba = clf.predict_proba(X)
                
                pred_label = str(pred)
                confidence = 0.5
                if proba is not None:
                    classes = getattr(clf, "classes_", None)
                    if classes is not None:
                        idx = list(classes).index(pred)
                        confidence = float(proba[0][idx])
                    else:
                        confidence = float(np.max(proba[0]))
            except Exception as e:
                return jsonify({"error": f"Prediction failed: {str(e)}"}), 500
        
        else:
            return jsonify({"error": "Unsupported model type"}), 500
        
        # Normalize label
        label = str(pred_label)
        if label.lower() in {"stress", "1", "true", "stressed"}:
            label = "Stress"
        elif label.lower() in {"non-stress", "0", "false", "not stress", "nonstress", "non stress"}:
            label = "Non-Stress"
        else:
            label = label.capitalize()
        
        # Update stats
        PREDICTION_COUNTS[label] = PREDICTION_COUNTS.get(label, 0) + 1
        RECENT_PREDICTIONS.append({
            "label": label,
            "probability": round(confidence, 4),
            "ts": datetime.utcnow().isoformat() + "Z",
        })
        if len(RECENT_PREDICTIONS) > 50:
            del RECENT_PREDICTIONS[0: len(RECENT_PREDICTIONS) - 50]
        
        return jsonify({"label": label, "probability": round(confidence, 4)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/stats", methods=["GET"])
def stats():
    total = sum(PREDICTION_COUNTS.values())
    return jsonify({
        "total": total,
        "stress": PREDICTION_COUNTS.get("Stress", 0),
        "nonStress": PREDICTION_COUNTS.get("Non-Stress", 0),
        "recent": RECENT_PREDICTIONS[-20:],
    })


@app.route("/dataset-stats", methods=["GET"])
def dataset_stats():
    dataset_paths = [
        os.path.join(ML_DIR, "stress.csv"),
        os.path.join(REPO_ROOT, "stress.csv"),
    ]
    
    df = None
    for path in dataset_paths:
        if os.path.exists(path):
            try:
                df = pd.read_csv(path)
                break
            except Exception:
                continue
    
    if df is None:
        return jsonify({"stress": 0, "nonStress": 0, "trend": []})
    
    label_col = None
    for col in df.columns:
        if col.lower() in {"label", "target", "class"}:
            label_col = col
            break
    
    if label_col is None:
        num_cols = [c for c in df.columns if pd.api.types.is_integer_dtype(df[c]) or pd.api.types.is_bool_dtype(df[c])]
        label_col = num_cols[0] if num_cols else (df.columns[0] if len(df.columns) else None)
    
    if label_col is None:
        return jsonify({"stress": 0, "nonStress": 0, "trend": []})
    
    # Determine if labels are numeric (0/1) or strings
    stress_count = 0
    non_stress_count = 0
    series = df[label_col]
    try:
        s_int = pd.to_numeric(series, errors='coerce')
        if s_int.notna().any():
            stress_count = int((s_int == 1).sum())
            non_stress_count = int((s_int == 0).sum())
        else:
            raise ValueError
    except Exception:
        def is_stress(value: str) -> bool:
            try:
                v = str(value).lower()
                return ("stress" in v) and ("non" not in v)
            except Exception:
                return False
        stress_count = int(series.apply(is_stress).sum())
        non_stress_count = int(len(series) - stress_count)
    
    bins = 7
    size = len(df)
    if size == 0:
        trend = []
    else:
        step = max(1, size // bins)
        trend = []
        for i in range(0, size, step):
            chunk = df.iloc[i:i + step]
            if pd.api.types.is_numeric_dtype(series):
                s = int((pd.to_numeric(chunk[label_col], errors='coerce') == 1).sum())
            else:
                def is_stress_local(value: str) -> bool:
                    try:
                        v = str(value).lower()
                        return ("stress" in v) and ("non" not in v)
                    except Exception:
                        return False
                s = int(chunk[label_col].apply(is_stress_local).sum())
            ns = int(len(chunk) - s)
            trend.append({"day": f"{len(trend) + 1}", "stress": s, "nonStress": ns})
    
    return jsonify({"stress": stress_count, "nonStress": non_stress_count, "trend": trend})


def _read_json(path: str):
    if not os.path.exists(path):
        return None, f"File not found: {path}"
    try:
        with open(path, "r") as f:
            return json.load(f), None
    except Exception as e:
        return None, str(e)


@app.route("/eda", methods=["GET"])
def eda():
    """Enhanced EDA endpoint that serves comprehensive analysis data"""
    paths = [
        os.path.join(ML_DIR, "reports", "eda_results.json"),
        os.path.join(REPO_ROOT, "reports", "eda_results.json"),
    ]
    
    data = None
    err = None
    for p in paths:
        data, err = _read_json(p)
        if err is None and data is not None:
            break
    
    # If no EDA file found, generate basic stats from dataset
    if err or data is None:
        dataset_paths = [
            os.path.join(ML_DIR, "stress.csv"),
            os.path.join(REPO_ROOT, "stress.csv"),
        ]
        df = None
        for path in dataset_paths:
            if os.path.exists(path):
                try:
                    df = pd.read_csv(path)
                    break
                except Exception:
                    continue
        
        if df is not None:
            # Generate basic EDA data from dataset
            label_col = None
            for col in df.columns:
                if col.lower() in ["label", "target", "class"]:
                    label_col = col
                    break
            
            # Basic stats
            basic_stats = {
                "shape": list(df.shape),
                "memory_mb": round(df.memory_usage(deep=True).sum() / 1024**2, 2),
                "duplicates": int(df.duplicated().sum()),
                "missing_total": int(df.isnull().sum().sum()),
            }
            
            # Label distribution
            label_distribution = {}
            if label_col and label_col in df.columns:
                label_distribution = df[label_col].value_counts().to_dict()
                label_distribution = {str(k): int(v) for k, v in label_distribution.items()}
            
            # Text columns analysis
            text_stats = {}
            text_cols = [c for c in df.columns if df[c].dtype == "object" and df[c].astype(str).str.len().mean() > 10]
            for col in text_cols[:3]:
                lengths = df[col].astype(str).str.len()
                word_counts = df[col].astype(str).str.split().str.len()
                sentence_counts = df[col].astype(str).str.count(r'[.!?]') + 1
                
                text_stats[col] = {
                    "avg_length": float(lengths.mean()),
                    "median_length": float(lengths.median()),
                    "avg_words": float(word_counts.mean()),
                    "median_words": float(word_counts.median()),
                    "avg_sentences": float(sentence_counts.mean()),
                }
            
            # Generate word frequencies for text analysis
            word_frequencies = []
            text_length_distribution = []
            if text_cols:
                main_text_col = text_cols[0]
                # Get all text
                all_text = " ".join(df[main_text_col].dropna().astype(str).tolist())
                # Clean and tokenize
                words = re.findall(r'\b[a-z]{3,}\b', all_text.lower())
                # Count frequencies
                word_freq = Counter(words)
                # Get top 50 words
                word_frequencies = [[word, count] for word, count in word_freq.most_common(50)]
                
                # Text length distribution
                text_lengths = df[main_text_col].astype(str).str.len()
                # Create buckets
                max_len = int(text_lengths.max()) if len(text_lengths) > 0 else 1000
                bucket_size = max(100, max_len // 10)
                buckets = {}
                for length in text_lengths:
                    bucket = (length // bucket_size) * bucket_size
                    buckets[bucket] = buckets.get(bucket, 0) + 1
                
                text_length_distribution = [
                    {"bucket": f"{k}-{k+bucket_size}", "count": v}
                    for k, v in sorted(buckets.items())
                ]
            
            # Generate subreddit statistics
            subreddit_stats = None
            if "subreddit" in df.columns:
                subreddit_counts = df["subreddit"].value_counts().head(15).to_dict()
                subreddit_stats = {
                    "top_subreddits": {str(k): int(v) for k, v in subreddit_counts.items()},
                    "total_unique": int(df["subreddit"].nunique()),
                    "subreddit_label_cross": {}
                }
                
                # Cross-tabulation: subreddit vs label
                if label_col:
                    top_10_subs = list(subreddit_counts.keys())[:10]
                    sub_df = df[df["subreddit"].isin(top_10_subs)]
                    if len(sub_df) > 0:
                        cross_tab = pd.crosstab(sub_df["subreddit"], sub_df[label_col])
                        subreddit_stats["subreddit_label_cross"] = {
                            "subreddits": [str(s) for s in cross_tab.index.tolist()],
                            "labels": [str(l) for l in cross_tab.columns.tolist()],
                            "values": cross_tab.values.tolist()
                        }
                
                # Stress rate by subreddit
                if label_col:
                    stress_rates = {}
                    for subreddit in list(subreddit_counts.keys())[:10]:
                        sub_data = df[df["subreddit"] == subreddit]
                        if len(sub_data) > 0:
                            # Determine stress label (1 or "Stress" or highest value)
                            label_values = sub_data[label_col].value_counts()
                            if len(label_values) > 0:
                                # Try to identify stress label
                                stress_label = None
                                if pd.api.types.is_numeric_dtype(sub_data[label_col]):
                                    stress_label = 1
                                else:
                                    stress_labels = [str(l).lower() for l in label_values.index]
                                    if any("stress" in l and "non" not in l for l in stress_labels):
                                        stress_label = [l for l in label_values.index if "stress" in str(l).lower() and "non" not in str(l).lower()][0]
                                    else:
                                        stress_label = label_values.index[0]
                                
                                if stress_label is not None:
                                    stress_count = int(label_values.get(stress_label, 0))
                                    total = len(sub_data)
                                    stress_rates[str(subreddit)] = {
                                        "stress_count": stress_count,
                                        "total": total,
                                        "stress_rate": round(stress_count / total, 3) if total > 0 else 0
                                    }
                    
                    subreddit_stats["stress_rates"] = stress_rates
            
            # Generate correlation analysis for numeric columns
            high_correlations = []
            numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
            if len(numeric_cols) > 1:
                corr_matrix = df[numeric_cols].corr()
                # Get upper triangle to avoid duplicates
                for i in range(len(corr_matrix.columns)):
                    for j in range(i+1, len(corr_matrix.columns)):
                        corr_val = corr_matrix.iloc[i, j]
                        if not pd.isna(corr_val) and abs(corr_val) > 0.5:  # Threshold for "high" correlation
                            high_correlations.append({
                                "feature1": str(corr_matrix.columns[i]),
                                "feature2": str(corr_matrix.columns[j]),
                                "correlation": float(corr_val)
                            })
                # Sort by absolute correlation value
                high_correlations.sort(key=lambda x: abs(x["correlation"]), reverse=True)
                high_correlations = high_correlations[:20]  # Top 20
            
            # Generate insights
            insights = []
            if label_col and len(label_distribution) == 2:
                counts = list(label_distribution.values())
                ratio = max(counts) / min(counts) if min(counts) > 0 else 1
                if ratio > 2:
                    insights.append({
                        "type": "warning",
                        "message": f"Severe class imbalance ({ratio:.1f}:1) - Consider resampling techniques"
                    })
                elif ratio > 1.5:
                    insights.append({
                        "type": "caution",
                        "message": f"Moderate class imbalance ({ratio:.1f}:1) - Use stratified sampling"
                    })
                else:
                    insights.append({
                        "type": "success",
                        "message": "Classes are well balanced for training"
                    })
            
            data = {
                "basic_stats": basic_stats,
                "label_distribution": label_distribution,
                "class_distribution": label_distribution,
                "text_stats": text_stats,
                "insights": insights,
                "high_correlations": high_correlations,
                "word_frequencies": word_frequencies,
                "text_length_distribution": text_length_distribution,
                "subreddit_stats": subreddit_stats,
                "timestamp": datetime.utcnow().isoformat() + "Z",
            }
        else:
            return jsonify({"error": "No EDA data or dataset found"}), 404
    
    # Ensure data has expected structure
    if not isinstance(data, dict):
        data = {}
    
    # Add defaults for missing fields
    if "basic_stats" not in data:
        data["basic_stats"] = {}
    if "label_distribution" not in data:
        data["label_distribution"] = data.get("class_distribution", {})
    if "text_stats" not in data:
        data["text_stats"] = {}
    if "insights" not in data:
        data["insights"] = []
    if "high_correlations" not in data:
        data["high_correlations"] = []
    if "word_frequencies" not in data:
        data["word_frequencies"] = []
    if "text_length_distribution" not in data:
        data["text_length_distribution"] = []
    if "subreddit_stats" not in data:
        data["subreddit_stats"] = None
    
    return jsonify(data)


@app.route("/metrics", methods=["GET"])
def metrics():
    """Get model evaluation metrics from various possible locations"""
    data = None

    # PRIORITY 1: Try fusion ensemble info first (has complete metrics and model info)
    fusion_info_path = os.path.join(ML_DIR, "models", "fusion_ensemble_info.json")
    if os.path.exists(fusion_info_path):
        fusion_data, fusion_err = _read_json(fusion_info_path)
        if fusion_err is None and fusion_data is not None:
            perf = fusion_data.get("performance", {})
            # Only use if performance metrics exist and are non-zero
            if perf.get("accuracy", 0) > 0:
                data = {
                    "accuracy": perf.get("accuracy", 0),
                    "precision": perf.get("precision", 0),
                    "recall": perf.get("recall", 0),
                    "f1_score": perf.get("f1_score", 0),
                    "model_type": fusion_data.get("model_type", "Fusion Ensemble"),
                    "num_models": fusion_data.get("num_models", 0),
                    "models": fusion_data.get("models", []),
                    "source": "fusion_ensemble_info",
                    "timestamp": fusion_data.get("timestamp", datetime.utcnow().isoformat() + "Z"),
                }

    # PRIORITY 2: Try primary metric files
    if data is None:
        metric_files = [
            os.path.join(ML_DIR, "reports", "model_evaluation_results.json"),
            os.path.join(ML_DIR, "reports", "evaluation_results.json"),
            os.path.join(REPO_ROOT, "reports", "model_evaluation_results.json"),
        ]

        for p in metric_files:
            file_data, err = _read_json(p)
            if err is None and file_data is not None:
                data = file_data
                break

    # PRIORITY 3: Try training metadata
    if data is None:
        training_meta_path = os.path.join(ML_DIR, "reports", "training_metadata.json")
        if os.path.exists(training_meta_path):
            train_data, train_err = _read_json(training_meta_path)
            if train_err is None and train_data is not None:
                # Extract best combination metrics
                best = train_data.get("best_combination", {})
                if best.get("accuracy", 0) > 0 or best.get("f1_score", 0) > 0:
                    data = {
                        "accuracy": best.get("accuracy", best.get("balanced_accuracy", 0)),
                        "f1_score": best.get("f1_score", 0),
                        "model": best.get("model", "Unknown"),
                        "source": "training_metadata",
                        "top_5_combinations": train_data.get("top_5_combinations", []),
                        "timestamp": train_data.get("timestamp", datetime.utcnow().isoformat() + "Z"),
                    }

    # PRIORITY 4: Try validation reports (only as last resort)
    if data is None:
        validation_files = [
            os.path.join(ML_DIR, "reports", "validation_report_20251111_164422.json"),
            os.path.join(ML_DIR, "reports", "validation_report_20251111_164342.json"),
            os.path.join(ML_DIR, "reports", "validation_report_20251111_084844.json"),
            os.path.join(ML_DIR, "reports", "validation_report_20251110_224157.json"),
        ]

        # Get the most recent validation report with actual metrics
        for p in validation_files:
            if os.path.exists(p):
                val_data, val_err = _read_json(p)
                if val_err is None and val_data is not None:
                    # Only use if it has actual performance metrics
                    if val_data.get("accuracy", 0) > 0:
                        data = {
                            "accuracy": val_data.get("accuracy", 0),
                            "precision": val_data.get("precision", 0),
                            "recall": val_data.get("recall", 0),
                            "f1_score": val_data.get("f1_score", 0),
                            "confusion_matrix": val_data.get("confusion_matrix", []),
                            "classification_report": val_data.get("classification_report", {}),
                            "source": "validation_report",
                            "timestamp": val_data.get("timestamp", datetime.utcnow().isoformat() + "Z"),
                        }
                        break
    
    # If no metrics found, return a helpful message with available files
    if data is None:
        reports_dir = os.path.join(ML_DIR, "reports")
        available_files = []
        if os.path.exists(reports_dir):
            try:
                available_files = [f for f in os.listdir(reports_dir) if f.endswith('.json')]
            except Exception:
                pass
        
        return jsonify({
            "message": "No evaluation metrics file found",
            "available_files": available_files[:10],  # Show first 10
            "suggestion": "Run model evaluation to generate metrics, or check validation reports",
            "timestamp": datetime.utcnow().isoformat() + "Z",
        }), 200  # Return 200 with info message instead of 404
    
    return jsonify(data)


@app.route("/tests", methods=["GET"])
def tests():
    test_files = [
        os.path.join(ML_DIR, "reports", "test_results.json"),
        os.path.join(REPO_ROOT, "reports", "test_results.json"),
    ]
    data = None
    err = None
    for p in test_files:
        data, err = _read_json(p)
        if err is None and data is not None:
            break
    if err:
        return jsonify({"error": err}), 404
    return jsonify(data)


@app.route("/figures/<path:filename>", methods=["GET"])
def serve_figure(filename):
    """Serve figure images from reports/figures directory"""
    figures_dir = os.path.join(ML_DIR, "reports", "figures")
    alt_figures_dir = os.path.join(REPO_ROOT, "reports", "figures")
    
    # Security: ensure filename doesn't contain path traversal
    if ".." in filename or "/" in filename or "\\" in filename:
        return jsonify({"error": "Invalid filename"}), 400
    
    # Try ML_DIR first, then REPO_ROOT
    for fig_dir in [figures_dir, alt_figures_dir]:
        if os.path.exists(fig_dir):
            file_path = os.path.join(fig_dir, filename)
            if os.path.exists(file_path) and os.path.isfile(file_path):
                return send_from_directory(fig_dir, filename)
    
    return jsonify({"error": "Figure not found"}), 404


@app.route("/figures", methods=["GET"])
def list_figures():
    """List all available figures"""
    figures_dir = os.path.join(ML_DIR, "reports", "figures")
    alt_figures_dir = os.path.join(REPO_ROOT, "reports", "figures")
    
    figures = []
    for fig_dir in [figures_dir, alt_figures_dir]:
        if os.path.exists(fig_dir):
            try:
                files = [f for f in os.listdir(fig_dir) 
                        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.svg', '.gif'))]
                figures.extend(files)
                break
            except Exception:
                continue
    
    return jsonify({"figures": sorted(set(figures))})


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8001"))
    print(f"\n🚀 Starting Flask server on port {port}")
    print(f"📁 ML Directory: {ML_DIR}")
    print(f"📁 Models: {os.path.join(ML_DIR, 'models')}")
    print("=" * 70)
    app.run(host="0.0.0.0", port=port, debug=False)
