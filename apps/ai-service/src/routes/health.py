from fastapi import APIRouter

from src.config.settings import get_settings
from src.models.schemas import HealthResponse

router = APIRouter(tags=["meta"])


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    settings = get_settings()
    return HealthResponse(status="ok", service="ai-service", model=settings.gemini_model)
