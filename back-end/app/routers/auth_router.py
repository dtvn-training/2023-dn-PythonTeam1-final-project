from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..connectDB.database import get_db
from ..models import user_model
from ..controllers import auth_controller

router = APIRouter(
    prefix="/login",
    tags=['Authencation']
)


@router.post("")
async def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(
        user_model.User.email == user_credentials.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Invalid username", "msg": "Invalid credentials"}
        )

    if not auth_controller.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Invalid password", "msg": "Invalid credentials"}
        )

    access_token = auth_controller.create_access_token(
        data={"user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}
