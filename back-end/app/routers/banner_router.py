from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter
from fastapi.security import OAuth2PasswordBearer
from ..controllers import banner_controller
from ..connectDB.database import get_db

router = APIRouter(
    prefix='/api/banner',
    tags=['Banner']
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/get_banner")
async def select_banner(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    list_banner = banner_controller.get_banner(token, db)
    return {"list_banner": list_banner}
