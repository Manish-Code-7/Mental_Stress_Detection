# Mental Stress Detection Backend API

## Overview

Flask REST API for mental stress detection using trained ML models. The backend automatically loads models from the `ml_model` directory and serves predictions via HTTP endpoints.

## Setup

### 1. Install Dependencies

```bash
cd web_files/backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Verify Model Files

The backend looks for models in these locations (relative to repo root):
- `ml_model/models/fusion_ensemble.pkl` (preferred)
- `ml_model/models/best_model.pkl`
- `ml_model/models/publication_model.pkl`
- `ml_model/models/label_encoder.pkl`

### 3. Run the Server

```bash
export PORT=8001  # Optional, defaults to 8001
python app.py
```

The server will start on `http://0.0.0.0:8001`

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and model information.

### Predict Stress
```
POST /predict
Content-Type: application/json

{
  "text": "I feel overwhelmed and stressed about work"
}
```

Response:
```json
{
  "label": "Stress",
  "probability": 0.9234
}
```

### Statistics
```
GET /stats
```
Returns prediction statistics (total, stress count, non-stress count, recent predictions).

### Dataset Statistics
```
GET /dataset-stats
```
Returns dataset statistics including stress/non-stress distribution and trends.

### EDA Data
```
GET /eda
```
Returns exploratory data analysis results (label distribution, text stats, insights).

### Model Metrics
```
GET /metrics
```
Returns model evaluation metrics (if available).

## Path Resolution

The backend uses relative paths from the `web_files/backend/` directory:

- **Backend Directory**: `web_files/backend/`
- **ML Directory**: `../ml_model/` (relative to repo root)
- **Models**: `ml_model/models/`
- **Preprocessors**: `ml_model/preprocessors/`
- **Reports**: `ml_model/reports/`
- **Dataset**: `ml_model/stress.csv`

## Model Loading Priority

1. **Fusion Ensemble** (`fusion_ensemble.pkl`) - Preferred, highest accuracy
2. **Best Model** (`best_model.pkl`)
3. **Publication Model** (`publication_model.pkl`)
4. **Fallback Pipeline** - Simple TF-IDF + Logistic Regression (if no models found)

## Troubleshooting

### Model Not Found
- Check that models exist in `ml_model/models/`
- Verify file permissions
- Check console output for loading errors

### Prediction Errors
- Ensure model file is not corrupted
- Check that label encoder exists if using fusion ensemble
- Verify text input is not empty

### Port Already in Use
```bash
export PORT=8010
python app.py
```

## Environment Variables

- `PORT`: Server port (default: 8001)

## Logging

The backend prints loading and error messages to console:
- `✓` = Success
- `⚠️` = Warning
- Error messages include full tracebacks

## Integration with Frontend

The frontend expects the backend at:
- Development: `http://127.0.0.1:8001`
- Production: Set `BACKEND_URL` environment variable

## Next Steps

1. Train models using the notebook (`ml_model/model_upgrade.ipynb`)
2. Save models to `ml_model/models/`
3. Start the backend server
4. Test with frontend or curl:

```bash
curl -X POST http://localhost:8001/predict \
  -H "Content-Type: application/json" \
  -d '{"text":"I feel stressed and anxious"}'
```




