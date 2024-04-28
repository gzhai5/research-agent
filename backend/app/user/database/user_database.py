from pymongo import MongoClient
from bson import ObjectId
from fastapi import HTTPException
from loguru import logger
from app.config import settings
from app.user.model.user_model import UserModel


class UserDatabase:

    def __init__(self):
        self.error_address = "User Database"
        self.client = MongoClient(settings.mongo_uri)
        self.db = self.client["User"]
        self.collection = self.db["user"]

    def get_user_by_id(self, user_id: str) -> dict:
        try:
            user = self.collection.find_one({"_id": ObjectId(user_id)})
            if user:
                return user
            else:
                logger.error(f"User with id {user_id} not found")
                raise HTTPException(status_code=404, detail=f"User with id {user_id} not found")
        except Exception as e:
            logger.error(f"Failed to get user by id: {e}")
            raise HTTPException(status_code=500, detail=str(e))
        
    def get_user_by_username(self, username: str) -> dict | None:
        try:
            user = self.collection.find_one({"username": username})
            return user
        except Exception as e:
            logger.error(f"Failed to get user by username: {e}")
            raise HTTPException(status_code=500, detail=str(e))
        
    def add_user(self, user: UserModel):
        try:
            user_dict = user.model_dump()
            insert_res = self.collection.insert_one(user_dict)
            user_id = insert_res.inserted_id
            logger.info(f"User added successfully with id: {str(user_id)}")
            return str(user_id)
        except Exception as e:
            logger.error(f"Failed to add user: {e}")
            raise HTTPException(status_code=500, detail=str(e))
        
    def delete_user_by_id(self, user_id: str):
        try:
            delete_res = self.collection.delete_one({"_id": id})
            if delete_res.deleted_count != 1:
                logger.error(f"User with id {user_id} not found")
                raise HTTPException(status_code=404, detail=f"User with id {user_id} not found")
        except Exception as e:
            logger.error(f"Failed to delete user by id: {e}")
            raise HTTPException(status_code=500, detail=str(e))


user_database = UserDatabase()