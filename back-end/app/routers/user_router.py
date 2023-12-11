from fastapi import APIRouter, status, Depends, HTTPException, Query, File, UploadFile
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from ..schemas import user_schemas
from ..connectDB.database import get_db
from ..controllers import user_controller
from typing import Annotated


router = APIRouter(
    prefix="/api/account",
    tags=['Account']
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/", response_model=user_schemas.ListUserOut)
async def get_accounts(token: Annotated[str | None, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    list_acount = user_controller.get_users(token, db)
    return {"list_acount": list_acount}


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_an_account(user: user_schemas.UserCreate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user_controller.create_a_user(user, token, db)
    return {
        "message": "Account successfully created"
    }


@router.put("/update/{user_id}", status_code=status.HTTP_200_OK)
async def update_account(
    user_id: str,
    user_info: user_schemas.UserUpdate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        updated_user = user_controller.update_user(
            user_id, user_info, token, db)
        return {"message": "Account successfully updated", "user": updated_user}
    except HTTPException as e:
        raise e
    finally:
        db.close()


@router.patch("/delete/{user_id}", status_code=status.HTTP_200_OK)
async def delete_user(user_id: str, token: Annotated[str | None, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    try:
        user_controller.delete_user(user_id, token, db)
        return {"message": "User successfully deleted"}
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"detail": e.detail})


@router.get("/get_user_info")
async def get_current_username(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    info = user_controller.get_current_username(token, db)
    return info


@router.post("/upload-avatar")
async def upload_avatar(token: str = Depends(oauth2_scheme), file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        user_controller.save_avatar(token, file, db)
        return JSONResponse(content={"message": "Avatar uploaded successfully"}, status_code=200)
    except HTTPException as e:
        return JSONResponse(content={"message": f"Error: {str(e.detail)}"}, status_code=e.status_code)
