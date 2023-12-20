from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter
from fastapi.security import OAuth2PasswordBearer
from ..controllers import banner_controller
from ..connectDB.database import get_db
from typing import List

router = APIRouter(
    prefix='/api/banner',
    tags=['Banner']
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/get_banner")
async def select_banner(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    list_banner = banner_controller.get_banner(token, db)
    return {"list_banner": list_banner}


@router.put("/deduction/{campaign_id}")
async def deduction_banner(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
    campaign_id: str = None
):

    response = banner_controller.deduction(token, db, campaign_id)
    return response
