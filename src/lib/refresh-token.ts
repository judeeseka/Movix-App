import type { RefreshResponse } from "@/features/auth";
import { api } from "./axios";

export const refresh = async () => {
    const response = await api.post<RefreshResponse>("/auth/refresh", {}, {
        withCredentials: true
    })

    return response.data
}