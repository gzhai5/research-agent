import boto3
import os
from fastapi import UploadFile, HTTPException
from loguru import logger
from app.config import settings


class S3Service:

    def __init__(self) -> None:
        self.s3 = boto3.resource("s3", aws_access_key_id=settings.AWS_ACCESS_KEY_ID, aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        self.bucket = self.s3.Bucket(settings.s3_bucket)

    async def upload_pdf(self, pdf: UploadFile, user_id: str):
        try:
            s3_key = f"{user_id}/pdf-chat/pdf/{pdf.filename}"
            file_content = await pdf.read()
            self.bucket.put_object(Key=s3_key, Body=file_content)
            logger.info(f"Uploaded PDF file to S3 successfully onto: {s3_key}")
            return s3_key
        except Exception as e:
            logger.error(f"An error occurred while uploading the PDF file: {e}")
            raise HTTPException(status_code=500, detail="An error occurred while uploading the PDF file")
    
    async def upload_folder(self, folder_path: str, user_id: str, topic: str):
        try:
            keys = []
            for subdir, dirs, files in os.walk(folder_path):
                for file in files:
                    full_path = os.path.join(subdir, file)
                    with open(full_path, 'rb') as data:
                        s3_key = f"{user_id}/pdf-chat/{topic}/{os.path.relpath(full_path, start=folder_path)}"
                        self.bucket.put_object(Key=s3_key, Body=data)
                        keys.append(s3_key)
                        logger.info(f"Uploaded {file} to S3 successfully onto: {s3_key}")
            logger.info(f"Uploaded folder to S3 successfully")
            return keys
        except Exception as e:
            logger.error(f"An error occurred while uploading the folder: {e}")
            raise HTTPException(status_code=500, detail="An error occurred while uploading the folder")
    
s3_service = S3Service()