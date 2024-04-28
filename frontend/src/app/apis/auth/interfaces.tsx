export interface LoginRequestBody {
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    username: string;
    user_id: string;
}

export interface RegisterRequestBody {
    username: string;
    password: string;
    email: string;
}

export interface RegisterResponse {
    user_id: string;
    username: string;
}

export interface RefreshResponse {
    access_token: string;
}