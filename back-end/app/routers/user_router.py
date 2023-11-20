from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from ..models import user_model
from ..schemas import user_schemas
from ..connectDB.database import get_db
from ..controllers import auth_controller

router = APIRouter(
    prefix="/users",
    tags=['Users']
)


@router.get("/", response_model=List[user_schemas.UserOut])
async def get_users(db: Session = Depends(get_db)):
    users = db.query(user_schemas.User).all()
    return users


@router.post("/createuser", status_code=status.HTTP_201_CREATED, response_model=user_schemas.UserOut)
async def create_user(user: user_schemas.UserCreate, db: Session = Depends(get_db)):
    # hash pwd
    hashed_password = auth_controller.hash(user.password)
    user.password = hashed_password
    new_user = user_model.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.get("/{id}", response_model=user_schemas.UserOut)
async def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(user_model.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} dose not exist!")

    return user
