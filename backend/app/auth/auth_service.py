from fastapi import HTTPException
from loguru import logger
from email_validator import validate_email, EmailNotValidError
from app.user.database.user_database import user_database
from app.user.model.user_model import UserModel
from app.auth.utils.utils import get_hashed_password, verify_password, create_access_token, create_refresh_token
import sys


class AuthService:

    def __init__(self) -> None:
        pass

    def login(self, username: str, password: str) -> str:
        
        # validate username and password
        self.validate_username(username)
        self.validate_password(password)

        user = user_database.get_user_by_username(username)
        if not user:
            logger.error(f'User called {username} not found')
            raise HTTPException(status_code=404, detail=f'User called {username} not found')
        
        if not verify_password(password, user['password']):
            logger.error('Incorrect password')
            raise HTTPException(status_code=400, detail='Incorrect password')
        
        return {
            "access_token": create_access_token(str(user['_id'])),
            "refresh_token": create_refresh_token(str(user['_id'])),
            "username": username,
            "user_id": str(user['_id']),
        }


    def register(self, username: str, password: str, email: str) -> str:
        print('registering', file=sys.stderr)
        
        # Validate username, password, and email
        self.validate_username(username)
        self.validate_password(password)
        self.validate_email(email)
        print('validated', file=sys.stderr)

        # Check if the username is already taken
        user = user_database.get_user_by_username(username)
        if user:
            logger.error('Username already taken')
            raise HTTPException(status_code=400, detail='Username already taken')

        # hash the password for security
        hashedPassword = get_hashed_password(password)

        # create a new user in the database
        user_model = UserModel(username=username, password=hashedPassword, email=email)
        user_id = user_database.add_user(user_model)
        return {
            "user_id": user_id,
            "username": username,
        }
    
    def refresh_token(self, user_id: str):
        return {
            "access_token": create_access_token(user_id)
        }



    @staticmethod
    def validate_username(username: str) -> None:
        if len(username) < 5 or len(username) > 12:
            logger.error('Username must be between 5 and 12 characters')
            raise HTTPException(status_code=400, detail='Username must be between 5 and 12 characters')
        
    @staticmethod
    def validate_password(password: str) -> None:

        # Check password length
        if len(password) < 8 and len(password) > 20:
            logger.error('Password must be between 8 and 20 characters')
            raise HTTPException(
                status_code=400,
                detail='Password must be between 8 and 20 characters')

        # Check for at least one uppercase letter
        if not any(char.isupper() for char in password):
            logger.error('Password must contain at least one uppercase letter')
            raise HTTPException(
                status_code=400,
                detail='Password must contain at least one uppercase letter')

        # Check for at least one lowercase letter
        if not any(char.islower() for char in password):
            logger.error('Password must contain at least one lowercase letter')
            raise HTTPException(
                status_code=400,
                detail='Password must contain at least one lowercase letter')

        # Check for at least one digit
        if not any(char.isdigit() for char in password):
            logger.error('Password must contain at least one digit')
            raise HTTPException(
                status_code=400,
                detail='Password must contain at least one digit')

        # Check for at least one special character
        if not any(char in "!@#$%^&*()-_+=[]{}|\\:;<>,.?/~`" for char in password):
            logger.error(
                'Password must contain at least one special character')
            raise HTTPException(
                status_code=400,
                detail='Password must contain at least one special character')
        
    @staticmethod
    def validate_email(email: str) -> None:
        try:
            emailinfo = validate_email(email, check_deliverability=True)
            email = emailinfo.normalized
        except EmailNotValidError as e:
            logger.error(f'Invalid email: {e}')
            raise HTTPException(status_code=400, detail='Invalid email')


auth_service = AuthService()