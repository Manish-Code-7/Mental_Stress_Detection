# Frontend-Backend Connection Guide

## Quick Fix for 502 Errors

The frontend is now configured to connect to **port 8003** by default (matching your backend).

### ✅ What I Fixed

1. **Created centralized backend config** (`frontend/src/lib/backend-config.ts`)
   - Defaults to `http://127.0.0.1:8003`
   - All API routes now use this config

2. **Updated all API routes** to use the new config:
   - `/api/stats`
   - `/api/predict`
   - `/api/health`
   - `/api/dataset-stats`
   - `/api/eda`
   - `/api/metrics`
   - `/api/tests`

3. **Added proper error handling** with cache control

## How to Use

### Option 1: Use Default (Port 8003)
Just restart your frontend - it will automatically connect to port 8003:

```bash
# Stop frontend (Ctrl+C)
# Restart frontend
cd web_files/frontend
npm run dev
```

### Option 2: Change Backend Port
If your backend runs on a different port, create `.env.local`:

```bash
cd web_files/frontend
echo "NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:YOUR_PORT" > .env.local
npm run dev
```

### Option 3: Use Environment Variable
```bash
cd web_files/frontend
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8003 npm run dev
```

## Verify Connection

1. **Backend is running** on port 8003:
   ```bash
   curl http://127.0.0.1:8003/health
   ```

2. **Frontend can reach backend**:
   - Open browser console (F12)
   - Check Network tab - API calls should return 200, not 502
   - NavBar should show "Connected" (green dot)

3. **Test prediction**:
   - Go to `/detect` page
   - Enter text and submit
   - Should get prediction result

## Troubleshooting

### Still Getting 502 Errors?

1. **Check backend is running**:
   ```bash
   curl http://127.0.0.1:8003/health
   ```
   Should return JSON with `"status": "healthy"`

2. **Check backend port**:
   - Look at backend console output
   - Should say "Running on http://127.0.0.1:8003"

3. **Restart frontend**:
   - Stop with Ctrl+C
   - Run `npm run dev` again
   - Next.js needs restart to pick up config changes

4. **Check firewall/network**:
   - Ensure localhost connections are allowed
   - Try `127.0.0.1` instead of `localhost`

### Backend on Different Port?

Update the config file:
```typescript
// frontend/src/lib/backend-config.ts
export const BACKEND_BASE_URL = "http://127.0.0.1:YOUR_PORT";
```

Or create `.env.local`:
```
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:YOUR_PORT
```

## Current Configuration

- **Backend Port**: 8003 (from your terminal output)
- **Frontend Port**: 3000
- **Backend URL**: `http://127.0.0.1:8003`
- **Config File**: `frontend/src/lib/backend-config.ts`

## Test Commands

```bash
# Test backend directly
curl http://127.0.0.1:8003/health

# Test prediction
curl -X POST http://127.0.0.1:8003/predict \
  -H "Content-Type: application/json" \
  -d '{"text":"I feel stressed"}'

# Test stats
curl http://127.0.0.1:8003/stats
```

## Next Steps

1. ✅ Backend running on port 8003
2. ✅ Frontend configured to use port 8003
3. 🔄 **Restart frontend** to apply changes
4. ✅ Test connection - should work now!





