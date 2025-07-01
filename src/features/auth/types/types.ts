export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    name: string;
    username: string;
    password: string
}

export interface AuthResponse {
    data: {
        username: string;
        token: string;
        userId: string;
        isOnboarded: boolean;
        avatarUrl : string;
    },
    message: string;
    success: boolean
}

export interface RefreshResponse {
    data: {
        accessToken: string
    },
    message: string;
    success: boolean;
}