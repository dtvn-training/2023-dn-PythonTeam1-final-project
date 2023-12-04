from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import List, Annotated

from ..models import user_model
from ..schemas import user_schemas
from ..connectDB.database import get_db
from ..controllers import user_controller

router = APIRouter(
    prefix="/api/account",
    tags=['Account']
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/", response_model=user_schemas.ListUserOut)
async def get_accounts(db: Session = Depends(get_db)):
    list_acount = user_controller.get_users(db)
    return {"list_acount": list_acount}


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_an_account(user: user_schemas.UserCreate, db: Session = Depends(get_db)):
    user_controller.create_a_user(user, db)
    return {
        "message": "Account successfully created"
    }


@router.put("/update", status_code=status.HTTP_200_OK)
async def update_account(user_info: user_schemas.UserUpdate, db: Session = Depends(get_db)):
    user_controller.update_user(user_info, db)
    return {
        "message": "Account successfully updated"
    }
