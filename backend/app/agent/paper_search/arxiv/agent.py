from app.agent.paper_search.arxiv.search import arxiv_search, SearchResults
from langchain.agents import AgentExecutor, tool
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.agents.format_scratchpad.openai_tools import ( format_to_openai_tool_messages )
from langchain.agents.output_parsers.openai_tools import OpenAIToolsAgentOutputParser
from app.config import settings


@tool
async def arxiv_search_tool(query: str) -> list[SearchResults]:
    """Search for a list of paper information based on a string query on arxiv"""
    return arxiv_search.search_by_query(query)    


class SearchAgent:
    def __init__(self) -> None:
        tools = [arxiv_search_tool]
        system_message = """You are a world class researcher, who can do detailed research on any topic and produce fact based results;
            you do not make things up, you will try as hard as possible to gather facts & data to backup the research
            
            Please make sure you complete the objective aboce with the following rules:
            1/ You should do enough research but no more than 3 times to gather as much information as possible about the objective
            2/ If you think you should search for some academic papers, you should use the arxiv search tool to search and gather information
            3/ You should not make things up, you should only write facts & data that you have gathered
            4/ Do not do the same research more than three times
            5/ In the final output, you should provide a list of foratted paper infomation that you have gathered, including the title, a link of pdf_url, published_date, authors, primary_category and summary to the paper
            6/ In the final output, you should provide a list of formatted paper infomation that you have gathered, including the title, a link of pdf_url, published_date, authors, primary_category and summary to the paper"""
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    system_message,
                ),
                ("user", "{input}"),
                MessagesPlaceholder(variable_name="agent_scratchpad"),
            ]
        )
        llm = ChatOpenAI(model='gpt-4-turbo', api_key=settings.openai_api_key, temperature=0)
        llm_with_tools = llm.bind_tools(tools)
        agent = (
            {
                "input": lambda x: x["input"],
                "agent_scratchpad": lambda x: format_to_openai_tool_messages(
                    x["intermediate_steps"]
                ),
            }
            | prompt
            | llm_with_tools
            | OpenAIToolsAgentOutputParser()
        )
        self.agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, handle_parsing_errors=True)

    async def invoke(self, text: str):
        async for chunk in self.agent_executor.astream({"input": text}):
            # Agent Action
            if "actions" in chunk:
                for action in chunk["actions"]:
                    print(f"Calling Tool: `{action.tool}` with input `{action.tool_input}`")
            # Observation
            elif "steps" in chunk:
                for step in chunk["steps"]:
                    print(f"Tool Result: `{step.observation}`")
            # Final result
            elif "output" in chunk:
                print(f'Final Output: {chunk["output"]}')
                return chunk["output"]
            else:
                raise ValueError()
            print("---")

search_agent = SearchAgent()