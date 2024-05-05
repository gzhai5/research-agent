
from pydantic import BaseModel
from typing import List
from datetime import datetime

# todo
class SearchResults(BaseModel):
    title: str
    pdf_url: str
    published: datetime
    authors: List[str]
    primary_category: str
    summary: str

class GoogleSearch:
    def __init__(self) -> None:
        pass
        
    def search_by_query(self, query: str, max_results=10) -> List[SearchResults]:
        pass


google_search = GoogleSearch()