import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from ..settings.config import settings


SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{settings.database_username}:{settings.database_password}@{
    settings.database_hostname}:{settings.database_port}/{settings.database_name}"
print(f"--------------------------mysql+pymysql://{settings.database_username}:{settings.database_password}@{
      settings.database_hostname}:{settings.database_port}/{settings.database_name}---------------------------")
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Connector = engine.connect()
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# while True:
#     try:
#         conn = psycopg2.connect(
#             host=settings.database_hostname,
#             database=settings.database_name,
#             user=settings.database_username,
#             password=settings.database_password,
#             cursor_factory=RealDictCursor
#         )
#         cursor = conn.cursor()
#         print('Connect to DB successful!')
#         break
#     except Exception as e:
#         print('Connect to DB failed!')
#         print('Error: ', e)
#         time.sleep(4)
