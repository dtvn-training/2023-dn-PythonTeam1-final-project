from fastapi.security import OAuth2PasswordBearer
from fastapi import APIRouter, Depends, HTTPException, status, Header
from typing import Annotated
from sqlalchemy.orm import Session
from ..schemas import user_schemas
from ..connectDB.database import get_db, SessionLocal
from ..models import user_model
from ..controllers import auth_controller as auth

router = APIRouter(
    prefix="/auth",
    tags=['Authencation']
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/login")
async def login(user_credentials: user_schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(
        user_model.User.email == user_credentials.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Invalid email or password",
                    "msg": "Invalid credentials"}
        )

    if not auth.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Invalid email or password",
                    "msg": "Invalid credentials"}
        )

    access_token = auth.create_access_token(
        data={"user_id": user.id})

    return {"msg": "Login successfully", "access_token": access_token, "token_type": "bearer"}


@router.get("/user")
async def get_user_by_token(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user_data = auth.get_current_user(token, db)
    return {"msg": "User found", "data": user_data}


@router.get("/checkTokenExpired")
async def is_token_expired(token: Annotated[str | None, Depends(oauth2_scheme)]):
    if auth.is_token_expired(token):
        return {
            "msg": "Access token is available"
        }
    else:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                             detail={"msg": "Access token has been expired"})
