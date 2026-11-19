from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserCreate, UserLogin, TokenResponse
from app.security import hash_password, verify_password, create_access_token
from app.auth import get_current_user
router=APIRouter(
    prefix="/users",
    tags=["Users"]
)
@router.post("/register", response_model=UserResponse)
def register_user(
    user:UserCreate,
    db: Session=Depends(get_db)
):
    existing_user=db.query(User).filter(
        User.email==user.email
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email Already registered"
        )
    hashed_password=hash_password(user.password)
    new_user=User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
@router.post("/login", response_model=TokenResponse)
def login_user(
    user:UserLogin,
    db: Session=Depends(get_db)
):
    existing_user=db.query(User).filter(
        User.email==user.email
    ).first()
    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User Not Found"
        )
    if not verify_password(
        user.password,
        existing_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )
    access_token=create_access_token(
        data={"sub": str(existing_user.id)}
    )
    return{
        "access_token":access_token,
        "token_type":"bearer"
    }
@router.get("/profile", response_model=UserResponse)
def get_profile(
    current_user: User=Depends(get_current_user)
):
    return current_user
    