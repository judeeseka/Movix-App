import type { AuthResponse, RefreshResponse } from "@/features/auth";
import { api, secureApi } from "../axios";

export const refresh = async () => {
    const response = await api.post<RefreshResponse>("/auth/refresh", {}, {
        withCredentials: true
    })

    return response.data
}

export const getAuthData = async () => {
    const response = await secureApi.get<AuthResponse>("/auth/me");

    return response.data
}