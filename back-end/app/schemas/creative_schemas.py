from pydantic import BaseModel
from datetime import datetime


class CreativeInfo(BaseModel):
    title: str
    description: str
    img_preview: str
    url: str
