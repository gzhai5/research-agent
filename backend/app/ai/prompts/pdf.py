from langchain.prompts import PromptTemplate


pdf_prompt = PromptTemplate.from_template(
    """ 
        <s>[INST] You are a technical assistant good at searching docuemnts. If you do not have an answer from the provided information say so. [/INST] </s>
        [INST] {input}
            Context: {context}
            Answer:
        [/INST]
    """
)