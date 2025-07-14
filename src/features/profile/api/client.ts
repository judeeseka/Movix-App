import { secureApi } from "@/lib/axios"
import type { IUser, IUserFavourite } from "../types"
import type { FavouritePayload } from "@/types/types"

export const getProfileData = async () => {
    const response = await secureApi.get<IUser>("/users")

    return response.data.data
}

export const updateProfileData = async (formData: FormData) => {
    const response = await secureApi.patch("/users/me", formData)

    return response.data;
}

export const getUserFavouriteInfo = async () => {
    const response = await secureApi.get<IUserFavourite>("/users/me/favourites")
    return response.data.data.favourites
}

export const toggleUserFavourite = async (payload: FavouritePayload) => {
    const response = await secureApi.patch("/users/me/favourites", payload);
    return response
}