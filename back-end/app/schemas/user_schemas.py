from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


class UserInfo(BaseModel):
    email: EmailStr


class UserCreate(UserInfo):
    password: str


class UserLogin(UserInfo):
    password: str
