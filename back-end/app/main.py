from fastapi import FastAPI, Request
import time
from fastapi.middleware.cors import CORSMiddleware
from .models import user_model, role_model, campaign_model, creative_model
from .connectDB.database import engine
from .routers import user_router, auth_router

role_model.Base.metadata.create_all(bind=engine)
user_model.Base.metadata.create_all(bind=engine)
campaign_model.Base.metadata.create_all(bind=engine)
creative_model.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origins=["http://localhost:3000"])

app.include_router(user_router.router)
app.include_router(auth_router.router)
