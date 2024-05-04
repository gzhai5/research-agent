from langchain_openai import ChatOpenAI
from app.config import settings


class ChatAgent:

    def __init__(self) -> None:
        self.llm = ChatOpenAI(model="gpt-3.5-turbo-0125", temperature=0.3, api_key=settings.openai_api_key)

    def chat(self, text: str):
        return self.llm.invoke(text).content
    
chat_agent = ChatAgent()