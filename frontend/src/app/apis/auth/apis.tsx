import { instance } from "../base/instance";
import { RegisterRequestBody, RegisterResponse, LoginRequestBody, LoginResponse, RefreshResponse } from "./interfaces";


export const login = async (body: LoginRequestBody): Promise<LoginResponse> => {
    const res = await instance.post("/auth/login", body);
    return res.data;
};

export const register = async (body: RegisterRequestBody): Promise<RegisterResponse> => {
    const res = await instance.post("/auth/register", body);
    return res.data;
};

export const refreshAccessToken = async (): Promise<RefreshResponse> => {
    const custimizedInstance = instance;
    custimizedInstance.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('refresh_token')}`;
    const res = await custimizedInstance.post("/auth/refresh");
    return res.data;
};

