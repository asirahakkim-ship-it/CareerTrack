
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from app.database import get_db
from app.models.application import Application
from app.models.user import User
from app.schemas.application import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationResponse
)
from app.auth import get_current_user


router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


# Add Application
@router.post("/", response_model=ApplicationResponse)
def create_application(
    application: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_application = Application(
        **application.model_dump(),
        user_id=current_user.id
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application


# Get All Applications of Logged-in User
@router.get("/", response_model=list[ApplicationResponse])
def get_applications(
    status: str | None = None,
    company: str| None=None,
    role:str|None=None,
    applied_date:date|None=None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Application).filter(
        Application.user_id == current_user.id
    )

    if status:
        query = query.filter(
            Application.status == status
        )
    if company:
        query=query.filter(
            Application.company.ilike(f"%{company}%")
        )
    if role:
        query=query.filter(
            Application.role.ilike(f"%{role}%")
        )
    if applied_date:
        query=query.filter(
            Application.applied_date==applied_date
        )
    applications = query.all()

    return applications


# Update Application
@router.put("/{application_id}", response_model=ApplicationResponse)
def update_application(
    application_id: int,
    application_data: ApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing_application = db.query(Application).filter(
        Application.id == application_id,
        Application.user_id == current_user.id
    ).first()

    if not existing_application:
        raise HTTPException(
            status_code=404,
            detail="Application Not Found"
        )

    update_data = application_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(existing_application, key, value)

    db.commit()
    db.refresh(existing_application)

    return existing_application


# Delete Application
@router.delete("/{application_id}")
def delete_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing_application = db.query(Application).filter(
        Application.id == application_id,
        Application.user_id == current_user.id
    ).first()

    if not existing_application:
        raise HTTPException(
            status_code=404,
            detail="Application Not Found"
        )

    db.delete(existing_application)
    db.commit()

    return {
        "message": "Application deleted successfully"
    }
