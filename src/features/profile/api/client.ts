import { secureApi } from "@/lib/axios"
import type { IUser } from "../types"

export const getProfileData = async () => {
    const response = await secureApi.get<IUser>("/users")

    return response.data.data
}

export const updateProfileData = async (formData: FormData) => {
    const response = await secureApi.patch("/users/me", formData)

    return response.data;
}