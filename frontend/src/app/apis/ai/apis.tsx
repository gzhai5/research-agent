import { instance } from "../base/instance";
import { InvokeRequestBody, InvokeResponse, AskPdfResponse } from "./interfaces";


export const invoke = async (body: InvokeRequestBody): Promise<InvokeResponse> => {
    const res = await instance.post("/ai/invoke", body);
    return res.data;
}

export const askPdf = async (query: string): Promise<AskPdfResponse> => {
    const res = await instance.post("/ai/ask-pdf", { query });
    return res.data;
}