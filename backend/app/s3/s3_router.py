from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from loguru import logger
from app.s3.s3_service import s3_service
from app.auth.utils.utils import get_current_user


# define the router
router = APIRouter(prefix="/s3", tags=["s3"])


# POST /s3/pdf/upload
@router.post("/pdf/upload", response_description="Upload a PDF file", status_code=201)
async def upload_pdf(file: UploadFile = File(...), user_id=Depends(get_current_user)):
    try:
        response = await s3_service.upload_pdf(file, user_id)
        return response
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        logger.error(f"An error occurred while uploading the PDF file: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while uploading the PDF file")