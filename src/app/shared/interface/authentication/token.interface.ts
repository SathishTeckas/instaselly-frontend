export interface iToken {
    jti: string;
    sub: string;
    userName: string;
    role: string;
    iat: number;
    exp: number;
}