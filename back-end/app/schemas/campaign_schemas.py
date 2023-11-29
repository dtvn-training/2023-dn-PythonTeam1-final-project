from pydantic import BaseModel
from typing import List
from ..schemas.creative_schemas import CreativeInfo


class CampaignInfo(BaseModel):
    campaign_name: str
    status: bool
    budget: int
    bid_amount: int
    start_date: str
    end_date: str
    creative: CreativeInfo


class CampaignUpdate(CampaignInfo):
    campaign_id: str
    update_at: str


class CampaignDelete(BaseModel):
    campaign_ids: List[str]
