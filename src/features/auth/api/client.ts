import type { AuthResponse, ILogin, IRegister } from "../types/types";
import { api, secureApi } from "@/lib/axios";
  

export const registerUser = async (data: IRegister) => {
    const response = await api.post<AuthResponse>("/auth/register", data, {
        withCredentials: true
    });

    return response.data
}

export const loginUser = async (data: ILogin) => {
    const response = await api.post<AuthResponse>("/auth/login", data, {
        withCredentials: true
    })

    return response.data;
}

export const logoutUser = async () => {
    const response = await api.post("/auth/logout", {}, {
        withCredentials: true
    });
    return response;
}

export const onboardUser = async (formData: FormData) => {
    const response = await secureApi.post<AuthResponse>("/auth/onboard", formData)
    return response.data;
}