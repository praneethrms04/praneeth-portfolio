from fastapi import HTTPException
from google.api_core.exceptions import GoogleAPIError

from src.config.settings import get_settings
from src.controllers.gemini_client import get_gemini_service
from src.models.schemas import SummarizeRequest, SummarizeResponse


async def handle_summarize(payload: SummarizeRequest) -> SummarizeResponse:
    settings = get_settings()
    service = get_gemini_service()

    try:
        summary, tokens = await service.summarize(payload.content, payload.style)
    except GoogleAPIError as err:
        raise HTTPException(status_code=502, detail=f"Gemini error: {err}") from err

    return SummarizeResponse(summary=summary, model=settings.gemini_model, tokens_used=tokens)
