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

# Configure environment (optional: MongoDB for contact form)
cp .env.example .env
# Edit .env and set MONGODB_URI if using MongoDB

export PORT=8001
python app.py
```

**Note**: MongoDB is optional. The contact form will work without it (graceful degradation), but submissions won't be saved.

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

### MongoDB Setup (Optional)
The contact form uses MongoDB to store submissions. If MongoDB is not configured, the form will still work but submissions won't be saved.

**Local MongoDB:**
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Set in backend .env:
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB=mental_stress_db
```

**MongoDB Atlas (Cloud):**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Set in backend `.env`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=mental_stress_db
```

### Deploy

#### Deploying to Render

**Backend (Flask API)**
1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: Leave empty (Dockerfile handles paths)
   - **Environment**: Docker
   - **Dockerfile Path**: `web_files/backend/Dockerfile`
   - **Build Command**: (automatic with Docker)
   - **Start Command**: (automatic with Docker)
4. Set Environment Variables:
   - `PORT=8001` (Render will override with their port)
   - `MONGODB_URI=<your-mongodb-atlas-connection-string>` (optional, for contact form)
   - `MONGODB_DB=mental_stress_db` (optional)
5. Deploy and note the backend URL (e.g., `https://your-backend.onrender.com`)

**Frontend (Next.js)**
1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `web_files/frontend`
   - **Environment**: Docker
   - **Dockerfile Path**: `web_files/frontend/Dockerfile`
   - **Build Command**: (automatic with Docker)
   - **Start Command**: (automatic with Docker)
4. Set Environment Variables:
   - `NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com` (use your actual backend URL)
   - `NEXT_TELEMETRY_DISABLED=1`
5. Deploy

**Alternative: Vercel/Netlify (Frontend) + Render (Backend)**
- Frontend: Deploy to Vercel/Netlify (Next.js)
- Backend: Deploy to Render or any Python host
- Set `NEXT_PUBLIC_BACKEND_URL` to point to your backend URL







