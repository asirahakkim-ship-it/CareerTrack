from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.application import Application
from app.models.user import User
from app.auth import get_current_user
router=APIRouter(prefix="/dashboard",
                 tags=["Dashboard"])
@router.get("/")
def get_dashboard(
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):
    total_applications=db.query(Application).filter(
        Application.user_id==current_user.id,
    ).count()
    applied_count=db.query(Application).filter(
        Application.user_id==current_user.id,
        Application.status=="Applied"
    ).count()
    interview_count=db.query(Application).filter(
        Application.user_id==current_user.id,
        Application.status=="Interview"
    ).count()
    selected_count=db.query(Application).filter(
        Application.user_id==current_user.id,
        Application.status=="Selected"
    ).count()
    rejected_count=db.query(Application).filter(
        Application.user_id==current_user.id,
        Application.status=="Rejected"
    ).count()
    shortlisted_count=db.query(Application).filter(
        Application.user_id==current_user.id,
        Application.status=="Shortlisted"
    ).count()
    return{
         "total_application":total_applications,
         "applied_count":applied_count,
         "interview_count":interview_count,
         "selected_count":selected_count,
         "rejected_count":rejected_count,
         "shortlisted_count":shortlisted_count
          
    }