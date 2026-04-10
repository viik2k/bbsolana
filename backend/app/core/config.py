"""
Configuration settings for BBSolana backend.
"""
from pydantic_settings import BaseSettings
from typing import List, Optional
import secrets


class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "BBSolana"
    
    # Security
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ENCRYPTION_KEY: str = secrets.token_urlsafe(32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://frontend:3000"]
    
    # Database
    DATABASE_URL: str = "postgresql://bbsolana:changeme123@postgres:5432/bbsolana"
    
    # Redis
    REDIS_URL: str = "redis://redis:6379/0"
    
    # Celery
    CELERY_BROKER_URL: str = "redis://redis:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://redis:6379/0"
    
    # Exchange APIs
    COINSPOT_API_KEY: Optional[str] = None
    COINSPOT_SECRET: Optional[str] = None
    BINANCE_API_KEY: Optional[str] = None
    BINANCE_SECRET: Optional[str] = None
    
    # AI Configuration
    KRONOS_MODEL: str = "NeoQuasar/Kronos-small"
    KRONOS_TOKENIZER: str = "NeoQuasar/Kronos-Tokenizer-base"
    KRONOS_DEVICE: str = "cpu"
    
    # Development
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()