from app.security import hash_password, verify_password
password="asira123"
hashed_password=hash_password(password)
print("Original password:", password)
print("Hashed password:", hashed_password)
result=verify_password(password, hashed_password)
print("Password Correct:", result)