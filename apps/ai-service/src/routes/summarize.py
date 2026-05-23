from fastapi import APIRouter

from src.controllers.summarize_controller import handle_summarize
from src.models.schemas import SummarizeRequest, SummarizeResponse

router = APIRouter(prefix="/summarize", tags=["summarize"])


@router.post("", response_model=SummarizeResponse)
async def summarize(payload: SummarizeRequest) -> SummarizeResponse:
    return await handle_summarize(payload)
