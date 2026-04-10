"""
Main API router for version 1.
"""
from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, exchanges, portfolio, prices, ai

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(exchanges.router, prefix="/exchanges", tags=["exchanges"])
api_router.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
api_router.include_router(prices.router, prefix="/prices", tags=["prices"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])