import asyncio
import google.generativeai as genai

from src.config.settings import get_settings
from src.models.schemas import ChatMessage
from src.models.portfolio_context import PORTFOLIO_CONTEXT


def _to_gemini_role(role: str) -> str:
    return "model" if role == "assistant" else "user"


class GeminiService:
    def __init__(self) -> None:
        settings = get_settings()
        genai.configure(api_key=settings.gemini_api_key)
        self.model_name = settings.gemini_model
        self.max_tokens = settings.gemini_max_tokens
        self.temperature = settings.gemini_temperature

    def _build_model(self, system_instruction: str, max_output_tokens: int, temperature: float):
        return genai.GenerativeModel(
            model_name=self.model_name,
            system_instruction=system_instruction,
            generation_config={
                "max_output_tokens": max_output_tokens,
                "temperature": temperature,
            },
        )

    async def chat(self, message: str, history: list[ChatMessage]) -> tuple[str, int]:
        model = self._build_model(PORTFOLIO_CONTEXT, self.max_tokens, self.temperature)

        gemini_history = [
            {"role": _to_gemini_role(m.role), "parts": [m.content]} for m in history
        ]

        def _call() -> tuple[str, int]:
            chat_session = model.start_chat(history=gemini_history)
            response = chat_session.send_message(message)
            reply = response.text or ""
            tokens = response.usage_metadata.total_token_count if response.usage_metadata else 0
            return reply, tokens

        return await asyncio.to_thread(_call)

    async def summarize(self, content: str, style: str) -> tuple[str, int]:
        instruction = {
            "short": "Summarize this blog post in 2-3 concise sentences.",
            "detailed": "Summarize this blog post in 4-6 sentences, covering the main points and key takeaways.",
        }[style]

        model = self._build_model(
            "You are a technical writer who summarizes blog posts clearly and accurately. Never invent details not present in the source text.",
            max_output_tokens=300,
            temperature=0.3,
        )

        prompt = f"{instruction}\n\nBlog post:\n{content}"

        def _call() -> tuple[str, int]:
            response = model.generate_content(prompt)
            summary = response.text or ""
            tokens = response.usage_metadata.total_token_count if response.usage_metadata else 0
            return summary, tokens

        return await asyncio.to_thread(_call)


_service: GeminiService | None = None


def get_gemini_service() -> GeminiService:
    global _service
    if _service is None:
        _service = GeminiService()
    return _service
