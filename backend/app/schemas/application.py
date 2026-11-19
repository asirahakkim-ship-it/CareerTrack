
from pydantic import BaseModel, ConfigDict
from datetime import date


class ApplicationCreate(BaseModel):
    company: str
    role: str
    location: str | None = None
    applied_date: date
    status: str = "Applied"
    job_link: str | None = None
    notes: str | None = None


class ApplicationUpdate(BaseModel):
    company: str | None = None
    role: str | None = None
    location: str | None = None
    applied_date: date | None = None
    status: str | None = None
    job_link: str | None = None
    notes: str | None = None


class ApplicationResponse(BaseModel):
    id: int
    company: str
    role: str
    location: str | None = None
    applied_date: date
    status: str
    job_link: str | None = None
    notes: str | None = None
    user_id: int

    model_config = ConfigDict(from_attributes=True)
