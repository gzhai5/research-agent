export interface InvokeRequestBody {
    model: string;
    text: string;
}

export interface InvokeResponse {
    model: string;
    response: string;
}

export interface AskPdfResponse {
    answer: string;
    sources: PdfSource[];
}

interface PdfSource {
    soucre: string;
    page_content: string;
}