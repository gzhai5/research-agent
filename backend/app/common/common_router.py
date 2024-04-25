from fastapi import APIRouter, HTTPException, UploadFile, File
from loguru import logger
from app.common.common_service import common_service


# define the router
router = APIRouter(prefix="/common", tags=["common"])


# POST /common/pdf/upload
@router.post("/pdf/upload", response_description="Upload a PDF file", status_code=201)
def upload_pdf(file: UploadFile = File(...)):
    try:
        response = common_service.upload_pdf(file)
        return response
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        logger.error(f"An error occurred while uploading the PDF file: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while uploading the PDF file")