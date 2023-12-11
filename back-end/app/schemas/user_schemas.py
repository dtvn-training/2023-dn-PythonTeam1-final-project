from pydantic import BaseModel, EmailStr
from typing import List


class UserInfo(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role_id: str
    address: str
    phone: str


class UserOut(UserInfo):
    user_id: str


class ListUserOut(BaseModel):
    list_acount: List[UserOut]


class UserCreate(UserInfo):
    password: str
    confirm_password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(UserInfo):
    user_id: str
    password: str
    confirm_password: str
