from fastapi import HTTPException
from loguru import logger
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import Chroma
from app.config import settings
from app.common.common_service import common_service
from app.ai.prompts.pdf import pdf_prompt
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from app.agent.decision.agent import DecisionMakingAgent
from app.agent.chat.agent import chat_agent
from app.agent.paper_search.arxiv.agent import search_agent


class AIService:
    def __init__(self):
        self.openai_llm = ChatOpenAI(model='gpt-4-turbo', api_key=settings.openai_api_key)

    async def invoke_text(self, model: str, text: str):
        if model == 'gpt-4-turbo':
            gpt_response = DecisionMakingAgent().make_decision(text)
            logger.info(f'for input {text}, the decision is {"casual chat" if gpt_response.chat_only else "research"}')
            
            # check if the user wanna just chat or do some research
            if gpt_response.chat_only:
                return {
                    'model': model,
                    'response': chat_agent.chat(text)
                }
            else:
                research_response = await search_agent.invoke(text)
                return {
                    'model': model,
                    'response': research_response
                }
        else:
            logger.error('AI Model not found')
            raise HTTPException(status_code=400, detail='AI Model not found')
        
    def ask_pdf(self, query: str):
        # load vector database
        vector_store = Chroma(persist_directory=common_service.vector_store_path, embedding_function=common_service.embedding)
        logger.info('Vector store loaded successfully')

        # create a retrieval chain
        retriever = vector_store.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={
                "k": 20,
                "score_threshold": 0.1,
            },
        )
        document_chain = create_stuff_documents_chain(self.openai_llm, pdf_prompt)
        chain = create_retrieval_chain(retriever, document_chain)
        logger.info('Retrieval chain created successfully')

        result = chain.invoke({"input": query})
        sources = []
        for doc in result["context"]:
            sources.append(
                {"source": doc.metadata["source"], "page_content": doc.page_content}
            )
        response_answer = {"answer": result["answer"], "sources": sources}
        return response_answer

ai_service = AIService()