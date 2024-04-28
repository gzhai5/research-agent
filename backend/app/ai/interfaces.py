from pydantic import BaseModel


class AIInvokeRequest(BaseModel):
    model: str
    text: str