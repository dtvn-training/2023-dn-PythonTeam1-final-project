from fastapi import APIRouter, status, HTTPException, Depends, Header
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from sqlalchemy.orm import Session
from typing import List

from ..schemas import campaign_schemas
from ..connectDB.database import get_db
from ..controllers import auth_controller as auth
from ..controllers import campaign_controller


router = APIRouter(
    prefix="/api/campaigns",
    tags=["Campaigns"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/")
async def create_a_campaign(token: Annotated[str | None, Depends(oauth2_scheme)], campaign: campaign_schemas.CampaignInfo, db: Session = Depends(get_db)):
    campaign_controller.create_a_campaign(campaign, token, db)
    return {
        "msg": "Campaign is created"
    }


@router.get("/pages")
async def get_the_number_of_campaign_pages(token: Annotated[str | None, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    number_of_pages = campaign_controller.select_number_of_pages(token, db)
    return {"the_number_of_pages": number_of_pages}


@router.get("/")
async def get_a_page_campaign(page: int, token: Annotated[str | None, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    list_campaign = campaign_controller.select_a_page_campaign(page, token, db)
    return {"campaigns": list_campaign}


@router.get("/{campaign_id}")
async def get_a_campaign(campaign_id, token: Annotated[str | None, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    campaign_data = campaign_controller.select_a_campaign(
        campaign_id, token, db)
    return campaign_data


@router.put("/")
async def update_a_campaign(campaign: campaign_schemas.CampaignUpdate, token: Annotated[str | None, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    campaign_controller.update_a_campaign(campaign, token, db)
    return {"msg": "Campaign is updated"}


@router.patch("/")
async def delete_campaigns(campaigns: campaign_schemas.CampaignDelete, token: Annotated[str | None, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    campaign_controller.delete_campaigns(campaigns, token, db)
    return {"msg": "Deleted successful"}
