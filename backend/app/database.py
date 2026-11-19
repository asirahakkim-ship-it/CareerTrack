import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
load_dotenv()
DATABASE_URL=os.getenv("DATABASE_URL")

#DATABASE ENGINE
engine=create_engine(
    DATABASE_URL,
    echo=True
)

#Create session
SessionLocal=sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False
)
#create Base
Base=declarative_base()
def get_db():
    db=SessionLocal()
    try:

        yield db
    finally:
        db.close()