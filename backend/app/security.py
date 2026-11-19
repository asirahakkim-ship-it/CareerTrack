from pwdlib import PasswordHash
from jose import jwt
from datetime import datetime, timedelta, timezone
import os
from dotenv import load_dotenv
load_dotenv()
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM=os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES=30
password_hash=PasswordHash.recommended()
def hash_password(password: str):
    return password_hash.hash(password)
def verify_password(plain_password:str, hashed_password:str):
    return password_hash.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode=data.copy()
    expire=datetime.now(timezone.utc)+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})
    encoded_jwt=jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM

    )
    return encoded_jwt
def verify_access_token(token:str):
    try:
        payload=jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
            )
        user_id=payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except Exception:
        return None
    
        