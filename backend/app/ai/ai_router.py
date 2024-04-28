from fastapi import APIRouter, HTTPException, Depends
from loguru import logger
from app.ai.interfaces import AIInvokeRequest
from app.ai.ai_service import ai_service
from app.auth.utils.utils import get_current_user


# define the router
router = APIRouter(prefix="/ai", tags=["ai"])


# POST /ai/invoke
@router.post("/invoke", response_description="invoke the AI model", status_code=200)
def invoke_ai(body: AIInvokeRequest, user_id=Depends(get_current_user)):
    try:
        response = ai_service.invoke_text(body.model, body.text)
        logger.info('AI invoked successfully')
        return response
    except Exception as e:
        logger.error(f'Failed to invoke AI: {e}')
        raise HTTPException(status_code=500, detail=str(e))
    

# POST /ai/ask-pdf
@router.post("/ask-pdf", response_description="ask a question about a pdf to the AI model", status_code=200)
def ask_pdf(query: str, user_id=Depends(get_current_user)):
    try:
        response = ai_service.ask_pdf(query)
        logger.info('AI asked pdf successfully')
        return response
    except Exception as e:
        logger.error(f'Failed to ask AI pdf: {e}')
        raise HTTPException(status_code=500, detail=str(e))