import { instance } from "../base/instance";
import { PdfUploadResponse } from "./interfaces";


export const PdfUpload = async (file: File): Promise<PdfUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await instance.post("/common/pdf/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
}