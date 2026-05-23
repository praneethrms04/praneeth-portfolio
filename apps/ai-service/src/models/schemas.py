from pydantic import BaseModel, Field
from typing import Literal


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000, description="Latest user question")
    history: list[ChatMessage] = Field(default_factory=list, max_length=20)


class ChatResponse(BaseModel):
    reply: str
    model: str
    tokens_used: int


class SummarizeRequest(BaseModel):
    content: str = Field(min_length=50, max_length=20000, description="Blog post body")
    style: Literal["short", "detailed"] = "short"


class SummarizeResponse(BaseModel):
    summary: str
    model: str
    tokens_used: int


class HealthResponse(BaseModel):
    status: str
    service: str
    model: str
