from fastapi import APIRouter, HTTPException, Depends
from loguru import logger
from app.auth.auth_service import auth_service
from app.auth.interfaces import LoginRequest, RegisterRequest
from app.auth.utils.utils import validate_refresh_token


# define the router
router = APIRouter(prefix="/auth", tags=["auth"])


# POST /auth/login
@router.post("/login", response_description="login a user", status_code=200)
def login(body: LoginRequest):
    try:
        response = auth_service.login(body.username, body.password)
        logger.info('User logged in successfully')
        return response
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        logger.error(f'Failed to login user: {e}')
        raise HTTPException(status_code=500, detail=str(e))
    

# POST /auth/register
@router.post("/register", response_description="register a user", status_code=201)
def register(body: RegisterRequest):
    try:
        response = auth_service.register(body.username, body.password, body.email)
        logger.info('User registered successfully')
        return response
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        logger.error(f'Failed to register user: {e}')
        raise HTTPException(status_code=500, detail=str(e))
    
# POST /auth/refresh
@router.post("/refresh", response_description="refresh access token", status_code=200)
def refresh_token(user_id: str = Depends(validate_refresh_token)):
    try:
        response = auth_service.refresh_token(user_id)
        logger.info('Token refreshed successfully')
        return response
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        logger.error(f'Failed to refresh token: {e}')
        raise HTTPException(status_code=500, detail=str(e))