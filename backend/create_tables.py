from app.database import Base, engine
from app.models.user import User
from app.models.application import Application
Base.metadata.create_all(bind=engine)
print("Database tables created successfully!")