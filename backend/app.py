from flask import Flask, request, jsonify
import os
import json
import joblib
import numpy as np
import pandas as pd
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)

# Resolve project root (parent of this backend folder)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


# In-memory stats
PREDICTION_COUNTS = {"Stress": 0, "Non-Stress": 0}
RECENT_PREDICTIONS = []  # last 50


def load_pipeline():
    candidates = [
        os.path.join(BASE_DIR, "model_pipeline.pkl"),
        os.path.join(BASE_DIR, "stacking_model.pkl"),
        os.path.join(BASE_DIR, "models", "model_pipeline.pkl"),
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return joblib.load(path)
            except Exception:
                continue

    tfidf_path = os.path.join(BASE_DIR, "tfidf_vectorizer.pkl")
    models_dir = os.path.join(BASE_DIR, "models")
    if os.path.isdir(models_dir):
        try:
            tfidf = None
            if os.path.exists(tfidf_path):
                tfidf = joblib.load(tfidf_path)
            clf_path = None
            for name in sorted(os.listdir(models_dir)):
                if name.endswith(".joblib"):
                    clf_path = os.path.join(models_dir, name)
                    break
            if clf_path is None:
                return None
            clf = joblib.load(clf_path)

            class PrefitVectorizerWrapper:
                def __init__(self, vectorizer):
                    self.vectorizer = vectorizer
                def fit(self, X, y=None):
                    return self
                def transform(self, X):
                    return self.vectorizer.transform(X)

            from sklearn.pipeline import Pipeline
            # If no saved vectorizer, fit one from dataset text
            if tfidf is None:
                candidates = [
                    os.path.join(BASE_DIR, "stress.csv"),
                    os.path.join(BASE_DIR, "stress_second.csv"),
                ]
                texts = []
                for path in candidates:
                    if os.path.exists(path):
                        try:
                            df_tmp = pd.read_csv(path)
                            # try common text column names
                            text_col = None
                            for col in ["text", "content", "sentence", "post_text"]:
                                if col in df_tmp.columns:
                                    text_col = col
                                    break
                            if text_col is None:
                                # fallback: first object dtype column
                                obj_cols = [c for c in df_tmp.columns if df_tmp[c].dtype == "object"]
                                text_col = obj_cols[0] if obj_cols else None
                            if text_col is not None:
                                texts.extend(df_tmp[text_col].dropna().astype(str).tolist())
                        except Exception:
                            continue
                # Limit to avoid huge memory
                if len(texts) > 50000:
                    texts = texts[:50000]
                if len(texts) == 0:
                    # Cannot fit vectorizer without text
                    return None
                tfidf = TfidfVectorizer(max_features=50000, ngram_range=(1,2), min_df=2)
                tfidf.fit(texts)
                # Persist for future runs
                try:
                    joblib.dump(tfidf, tfidf_path)
                except Exception:
                    pass

            pipeline = Pipeline([("tfidf", PrefitVectorizerWrapper(tfidf)), ("clf", clf)])
            return pipeline
        except Exception:
            return None
    return None


PIPELINE = load_pipeline()


def resolve_model(pipeline_obj):
    if pipeline_obj is None:
        return None
    # If dict-like with a nested pipeline/model
    if isinstance(pipeline_obj, dict):
        for key in ["pipeline", "model", "clf"]:
            if key in pipeline_obj:
                return pipeline_obj[key]
        # vectorizer + classifier combo
        vec = pipeline_obj.get("vectorizer")
        clf = pipeline_obj.get("classifier") or pipeline_obj.get("model")
        if vec is not None and clf is not None:
            class PrefitVectorizerWrapper:
                def __init__(self, vectorizer):
                    self.vectorizer = vectorizer
                def fit(self, X, y=None):
                    return self
                def transform(self, X):
                    return self.vectorizer.transform(X)
            from sklearn.pipeline import Pipeline as SKPipeline
            return SKPipeline([("tfidf", PrefitVectorizerWrapper(vec)), ("clf", clf)])
        return None
    # Already a model or sklearn pipeline
    return pipeline_obj


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
    })


@app.route("/health", methods=["GET"])
def health():
    model = resolve_model(PIPELINE)
    attrs = []
    for a in ["predict", "predict_proba", "decision_function"]:
        if hasattr(model, a):
            attrs.append(a)
    model_type = type(model).__name__ if model is not None else None
    return jsonify({
        "status": "healthy",
        "pipeline_loaded": PIPELINE is not None,
        "model_type": model_type,
        "model_attrs": attrs,
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        text = (data or {}).get("text", "")
        if not text or not str(text).strip():
            return jsonify({"error": "No text provided"}), 400
        if PIPELINE is None:
            return jsonify({"error": "Model pipeline not loaded"}), 500

        model = resolve_model(PIPELINE)
        if model is None:
            return jsonify({"error": "Model object could not be resolved"}), 500
        if not hasattr(model, "predict"):
            # Fallback: manual vectorize + classifier from models
            tfidf_path = os.path.join(BASE_DIR, "tfidf_vectorizer.pkl")
            models_dir = os.path.join(BASE_DIR, "models")
            if os.path.exists(tfidf_path) and os.path.isdir(models_dir):
                try:
                    tfidf = joblib.load(tfidf_path)
                    clf_path = None
                    for name in sorted(os.listdir(models_dir)):
                        if name.endswith(".joblib"):
                            clf_path = os.path.join(models_dir, name)
                            break
                    if clf_path is None:
                        return jsonify({"error": "No classifier .joblib found in models/"}), 500
                    clf = joblib.load(clf_path)
                    X = tfidf.transform([text])
                    pred = clf.predict(X)[0]
                    proba = None
                    if hasattr(clf, "predict_proba"):
                        proba = clf.predict_proba(X)
                except Exception as e:
                    return jsonify({"error": f"Fallback failed: {str(e)}"}), 500
            else:
                return jsonify({"error": "Loaded model has no predict method and fallback assets not found"}), 500
        else:
            pred = model.predict([text])[0]
            proba = None
            if hasattr(model, "predict_proba"):
                proba = model.predict_proba([text])

        prob = 0.5
        if proba is not None:
            try:
                # Try mapping to predicted label index
                classes = getattr(model, "classes_", None)
                if classes is None and 'clf' in getattr(model, 'named_steps', {}):
                    classes = getattr(model.named_steps['clf'], 'classes_', None)
                if classes is not None:
                    idx = list(classes).index(pred)
                    prob = float(proba[0][idx])
                else:
                    prob = float(np.max(proba[0]))
            except Exception:
                try:
                    prob = float(np.max(proba[0]))
                except Exception:
                    prob = 0.5

        label = str(pred)
        if label.lower() in {"stress", "1", "true", "stressed"}:
            label = "Stress"
        elif label.lower() in {"non-stress", "0", "false", "not stress", "nonstress"}:
            label = "Non-Stress"
        else:
            label = label.capitalize()

        # update stats
        PREDICTION_COUNTS[label] = PREDICTION_COUNTS.get(label, 0) + 1
        RECENT_PREDICTIONS.append({
            "label": label,
            "probability": round(prob, 4),
            "ts": datetime.utcnow().isoformat() + "Z",
        })
        if len(RECENT_PREDICTIONS) > 50:
            del RECENT_PREDICTIONS[0: len(RECENT_PREDICTIONS) - 50]

        return jsonify({"label": label, "probability": round(prob, 4)})
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
    candidates = [
        os.path.join(BASE_DIR, "stress.csv"),
        os.path.join(BASE_DIR, "stress_second.csv"),
    ]
    df = None
    for path in candidates:
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
        # fallback: first non-text numeric column
        num_cols = [c for c in df.columns if pd.api.types.is_integer_dtype(df[c]) or pd.api.types.is_bool_dtype(df[c])]
        label_col = num_cols[0] if num_cols else (df.columns[0] if len(df.columns) else None)
    if label_col is None:
        return jsonify({"stress": 0, "nonStress": 0, "trend": []})

    # Determine if labels are numeric (0/1) or strings
    stress_count = 0
    non_stress_count = 0
    series = df[label_col]
    try:
        # Try numeric
        s_int = pd.to_numeric(series, errors='coerce')
        if s_int.notna().any():
            stress_count = int((s_int == 1).sum())
            non_stress_count = int((s_int == 0).sum())
        else:
            raise ValueError
    except Exception:
        # String heuristic
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
    data, err = _read_json(os.path.join(BASE_DIR, "reports", "eda_results.json"))
    if err:
        return jsonify({"error": err}), 404
    return jsonify(data)


@app.route("/metrics", methods=["GET"])
def metrics():
    data, err = _read_json(os.path.join(BASE_DIR, "reports", "model_evaluation_results.json"))
    if err:
        return jsonify({"error": err}), 404
    return jsonify(data)


@app.route("/tests", methods=["GET"])
def tests():
    data, err = _read_json(os.path.join(BASE_DIR, "reports", "test_results.json"))
    if err:
        return jsonify({"error": err}), 404
    return jsonify(data)


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    app.run(host="0.0.0.0", port=port)


