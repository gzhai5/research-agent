from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
from loguru import logger
from app.config import settings


class DecisionOutput(BaseModel):
    chat_only: bool = Field(description="Whether the user wanna a casual talk or wanna to have some research.")


class DecisionMakingAgent:

    def __init__(self) -> None:
        model = ChatOpenAI(model="gpt-3.5-turbo-0125", temperature=0, api_key=settings.openai_api_key)
        self.structured_llm = model.with_structured_output(DecisionOutput)

    def make_decision(self, text: str) -> DecisionOutput:
        decision = self.structured_llm.invoke(f'{text}, please think I wanna to have a casual chat or wanna you to help me do some research, please only respond True and False')

        # check output's type
        if not isinstance(decision, DecisionOutput):
            logger.warning(f"Decision agent cannot generate a desired output type with input {text} and output {decision}")
            return DecisionOutput(chat_only=True)
        return decision
    
decision_agent = DecisionMakingAgent()