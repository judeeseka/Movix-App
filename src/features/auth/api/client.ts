import axios from "axios";
import type { AuthResponse, ILogin, IRegister, RefreshResponse } from "../types/types";

const authApi = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export const registerUser = async (data: IRegister) => {
    const response = await authApi.post<AuthResponse>("/register", data);

    return response.data
}

export const loginUser = async (data: ILogin) => {
    const response = await authApi.post<AuthResponse>("/login", data)

    return response.data;
}

export const logoutUser = async () => {
    const response = await authApi.post("/logout");
    return response;
}

export const onboardUser = async (formData: FormData, token: string) => {
    const response = await authApi.post<AuthResponse>("/onboard", formData, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data;
}

export const refresh = async () => {
    const response = await authApi.post<RefreshResponse>("/refresh", {});

    return response.data
}