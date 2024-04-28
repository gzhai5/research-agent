from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from loguru import logger
from app.utils.database import test_mongodb_connection
from app.common.common_router import router as common_router
from app.auth.auth_router import router as auth_router


# Create the app
@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup logic
    test_mongodb_connection()
    logger.info("INFO: App started successfully")

    yield

    # shutdown logic
    logger.info("INFO: App stopped successfully")
app = FastAPI(title="Research-Agent BackEnd", lifespan=lifespan)


# set the CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,  # allow the cookie
    allow_methods=["*"],  # allow all http methods
    allow_headers=["*"],  # all all headers
)


# include the routers
app.include_router(common_router)
app.include_router(auth_router)


# Home route
@app.get("/")
async def home():
    return {"message": "This is the back-end for the research agent"}


# Exception handler
@app.exception_handler(HTTPException)
def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )