import arxiv
from pydantic import BaseModel
from typing import List
from datetime import datetime


class SearchResults(BaseModel):
    title: str
    pdf_url: str
    published: datetime
    authors: List[str]
    primary_category: str
    summary: str

class ArxivSearch:
    def __init__(self) -> None:
        self.client = arxiv.Client()
        
    def search_by_query(self, query: str, max_results=10) -> List[SearchResults]:
        search = arxiv.Search(
            query = query,
            max_results = max_results,
            sort_by=arxiv.SortCriterion.Relevance
        )
        results = self.client.results(search)
        all_results = list(results)
        outputs = []
        for result in all_results:
            outputs.append(SearchResults(
                title = result.title,
                pdf_url = result.pdf_url,
                published = result.published,
                authors = [author.name for author in result.authors],
                primary_category = result.primary_category,
                summary = result.summary
            ))
        return outputs


arxiv_search = ArxivSearch()