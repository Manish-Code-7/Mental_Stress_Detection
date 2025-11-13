## Mental Stress Detection — Frontend + Backend

This project includes:
- Python backend (Flask) serving stress detection (`web_files/backend/app.py`)
- Next.js frontend with reusable UI components (`web_files/frontend`)
- Model artifacts and notebooks under `ml_model/`

### Quick Start (local)
Prereqs: Python 3.12, Node 18+ (or Docker)

1) Backend
```bash
cd web_files/backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export PORT=8001
python app.py
```

2) Frontend
```bash
cd web_files/frontend
npm install
# set backend URL (default matches 8001)
echo 'BACKEND_URL=http://127.0.0.1:8001' > .env.local
npm run dev
```
Open http://localhost:3000

### Docker Compose (dev)
```bash
docker compose up --build
```
- Frontend: http://localhost:3000
- Backend:  http://localhost:8001

### Model Artifacts
The backend auto-discovers pipelines/models from:
- `ml_model/models/{model_pipeline.pkl, publication_model.pkl, best_model.pkl, fusion_ensemble.pkl}`
- Or builds a pipeline from a TF-IDF vectorizer in `ml_model/preprocessors/` and classifier in `ml_model/models/`
- Fallbacks try to learn a TF-IDF using `stress.csv` if available

### Environment
- Frontend uses API routes to proxy requests to `BACKEND_URL` (default `http://127.0.0.1:8001`)
- Adjust `BACKEND_URL` via `web_files/frontend/.env.local`

### Deploy
- Frontend: Vercel/Netlify (Next.js)
- Backend: Any Python host; run `python web_files/backend/app.py` (or add Gunicorn)






