from fastapi import APIRouter

from src.controllers.chat_controller import handle_chat
from src.models.schemas import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    return await handle_chat(payload)
