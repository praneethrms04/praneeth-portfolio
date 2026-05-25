from fastapi import FastAPI

from src.middleware.cors import setup_cors
from src.routes import chat, summarize, health

app = FastAPI(
    title="Praneeth Portfolio — AI Service",
    description="FastAPI microservice exposing portfolio chatbot and blog summarizer.",
    version="1.0.0",
)

setup_cors(app)

app.include_router(health.router)
app.include_router(chat.router)
app.include_router(summarize.router)
