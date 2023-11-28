from pydantic import BaseModel
from datetime import datetime


class CreativeInfo(BaseModel):
    title: str
    description: bool
    creative_review: str
    url: str


class CreativeRead(BaseModel):
    uuid: str
