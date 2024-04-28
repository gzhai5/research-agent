from pydantic import BaseModel, Field


class UserModel(BaseModel):
    id: str | None = Field(default= None, alias= "_id")
    username: str
    password: str
    email: str
