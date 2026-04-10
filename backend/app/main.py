"""
BBSolana Backend - Main Application Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.api import api_router
from app.core.logging import setup_logging


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup
    print("Starting BBSolana backend...")
    setup_logging()
    
    # Create database tables (in development)
    if settings.DEBUG:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    
    yield
    
    # Shutdown
    print("Shutting down BBSolana backend...")
    await engine.dispose()


# Create FastAPI application
app = FastAPI(
    title="BBSolana API",
    description="BYO-API Crypto Dashboard Backend",
    version="0.1.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# Set up CORS
if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    """Root endpoint with basic info."""
    return {
        "message": "Welcome to BBSolana API",
        "version": "0.1.0",
        "docs": "/api/v1/docs",
        "health": "/api/v1/health",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint for Docker/load balancers."""
    return {"status": "healthy", "service": "bbsolana-backend"}


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
    )