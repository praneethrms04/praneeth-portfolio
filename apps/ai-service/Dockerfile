FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src ./src

RUN adduser --disabled-password --gecos "" --uid 1001 appuser
USER appuser

EXPOSE 3003

CMD uvicorn src.index:app --host 0.0.0.0 --port ${PORT:-3003}
