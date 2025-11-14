FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Copy requirements and install dependencies
COPY web_files/backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Optional: common scientific stack helpers that sklearn may leverage
RUN pip install --no-cache-dir scipy

# Copy all necessary files for deployment
COPY web_files/backend/ /app/backend/
COPY ml_model/ /app/ml_model/

EXPOSE 8001

# Run the application
CMD ["python", "backend/app.py"]







