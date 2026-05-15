from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    # Database URL
    DATABASE_URL: str = Field(default="sqlite:///./guardforge.db", env="DATABASE_URL")
    # JWT secret key
    JWT_SECRET_KEY: str = Field(default="super-secret-key", env="JWT_SECRET_KEY")
    # JWT algorithm
    JWT_ALGORITHM: str = "HS256"
    # Access token expiry minutes
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    # Redis URL (optional)
    REDIS_URL: str = Field(default="redis://redis:6379", env="REDIS_URL")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
