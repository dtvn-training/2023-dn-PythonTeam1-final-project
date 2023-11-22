from fastapi import APIRouter, Depends, HTTPException, status, Header
from typing import Annotated
from sqlalchemy.orm import Session
from ..schemas import user_schemas
from ..connectDB.database import get_db
from ..models import user_model
from ..controllers import auth_controller as auth

router = APIRouter(
    prefix="/auth",
    tags=['Authencation']
)


@router.post("/login")
async def login(user_credentials: user_schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(
        user_model.User.email == user_credentials.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Invalid username", "msg": "Invalid credentials"}
        )

    if not auth.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Invalid password", "msg": "Invalid credentials"}
        )

    access_token = auth.create_access_token(
        data={"user_id": user.id}, db=db)

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/user")
async def get_user_by_token(token: str | None = None, db: Session = Depends(get_db)):
    user_data = auth.get_current_user(token, db)
    if not user_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail={"error": "Invalid Token", "msg": "No token in database"})
    return user_schemas.UserInfo(user_data.email)


@router.get("/checkTokenExpired")
async def is_token_expired(Authorization: Annotated[str | None, Header()] = None):
    if auth.is_token_expired(Authorization):
        return {
            "msg": "Access token available"
        }
    else:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                             detail={"msg": "Access token has been expired"})
