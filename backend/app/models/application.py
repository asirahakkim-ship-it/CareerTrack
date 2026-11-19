from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text
from app.database import Base
class Application(Base):
    __tablename__="applications"
    id=Column(Integer, primary_key=True, index=True)
    company=Column(String(150), nullable=False)
    role=Column(String(150), nullable=False)
    location=Column(String(150))
    applied_date=Column(Date, nullable=False)
    status=Column(String(50), default="Applied")
    job_link=Column(String(500))
    notes=Column(Text)
    user_id=Column(Integer, ForeignKey("users.id"), nullable=False)