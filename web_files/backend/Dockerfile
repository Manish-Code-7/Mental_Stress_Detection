FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY web_files/backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Optional: common scientific stack helpers that sklearn may leverage
RUN pip install --no-cache-dir scipy

# Code will be bind-mounted by docker-compose; keep image light
EXPOSE 8001

CMD ["python", "web_files/backend/app.py"]






