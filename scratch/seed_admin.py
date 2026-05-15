
from backend.app.database import SessionLocal, engine, Base
from backend.app.models.user import User
from backend.app.core.security import hash_password

def seed_only_admin():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if admin user exists
    admin = db.query(User).filter(User.email == "admin@guardforge.ai").first()
    if not admin:
        admin = User(
            email="admin@guardforge.ai",
            hashed_password=hash_password("admin123"),
            full_name="Aliyan Admin",
            role="admin"
        )
        db.add(admin)
        db.commit()
        print("Admin user created: admin@guardforge.ai / admin123")
    else:
        print("Admin user already exists.")
    db.close()

if __name__ == "__main__":
    seed_only_admin()
