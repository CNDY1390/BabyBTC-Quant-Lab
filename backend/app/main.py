# Main FastAPI application for BabyBTC backend

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import uvicorn

from .config import API_PREFIX, CORS_ORIGINS
from .api import routes_game, routes_admin, routes_ai

# Create FastAPI app
app = FastAPI(
    title="BabyBTC Quant Lab Backend",
    description="Educational blockchain for Scoop AI Hackathon",
    version="1.0.0"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(routes_game.router)
app.include_router(routes_admin.router)
app.include_router(routes_ai.router)

# Root endpoint
@app.get("/")
async def root():
    return {
        "name": "BabyBTC Quant Lab",
        "status": "running",
        "description": "Educational blockchain for learning purposes only",
        "warning": "This is a toy blockchain. Do not use for real transactions!"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Optional: Serve frontend static files if they exist
frontend_path = Path(__file__).parent.parent.parent / "frontend" / "dist"
if frontend_path.exists():
    app.mount("/", StaticFiles(directory=str(frontend_path), html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
