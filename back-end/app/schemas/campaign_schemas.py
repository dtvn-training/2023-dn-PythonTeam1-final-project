from pydantic import BaseModel
from typing import List
from datetime import datetime


class CampaignInfo(BaseModel):
    campaign_name: str
    status: bool
    budget: int
    bid_amount: int
    start_date: str
    end_date: str


class CampaignUpdate(CampaignInfo):
    campaign_id: str
    update_at: str


class CampaignDelete(BaseModel):
    campaign_ids: List[str]
