from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.common.common_router import router as common_router


app = FastAPI(title="Research-Agent BackEnd")


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