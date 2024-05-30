export interface iLoginRequest {
    userName: string;
    password: string;
    remember?: boolean;
}

export interface iLoginResponse {
    statusCode: number;
    description: string;
    status: string;
}