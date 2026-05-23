from fastapi import HTTPException
from google.api_core.exceptions import GoogleAPIError

from src.config.settings import get_settings
from src.controllers.gemini_client import get_gemini_service
from src.models.schemas import ChatRequest, ChatResponse


async def handle_chat(payload: ChatRequest) -> ChatResponse:
    settings = get_settings()
    service = get_gemini_service()

    try:
        reply, tokens = await service.chat(payload.message, payload.history)
    except GoogleAPIError as err:
        raise HTTPException(status_code=502, detail=f"Gemini error: {err}") from err

    return ChatResponse(reply=reply, model=settings.gemini_model, tokens_used=tokens)
