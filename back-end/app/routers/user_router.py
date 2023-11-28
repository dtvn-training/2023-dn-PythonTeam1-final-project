from fastapi import APIRouter, status, HTTPException, Depends, Header
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from sqlalchemy.orm import Session
from typing import List

from ..models import user_model
from ..schemas import user_schemas
from ..connectDB.database import get_db
from ..controllers import auth_controller as auth

router = APIRouter(
    prefix="/users",
    tags=['Users']
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/", response_model=List[user_schemas.UserOut])
async def get_users(db: Session = Depends(get_db)):
    users = db.query(user_schemas.User).all()
    return users


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(user: user_schemas.UserCreate, db: Session = Depends(get_db)):
    # hash pwd
    hashed_password = auth.hash(user.password)
    user.password = hashed_password
    new_user = user_model.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.get("/{id}")
async def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(
        user_model.User.user_id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} dose not exist!")

    return user
