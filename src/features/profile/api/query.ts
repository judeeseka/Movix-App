import { queryOptions, type UseMutationOptions } from "@tanstack/react-query";
import { getProfileData, getUserFavouriteInfo, toggleUserFavourite } from "./client";
// import type { IUserFavourite } from "../types";
import { toast } from "sonner";
import { useFavouriteStore } from "@/stores/favourite-store";
import type { FavouritePayload } from "@/types/types";

type Context = {
    // previousData?: IUserFavourite
    previousData: FavouritePayload[]
    action: "added" | "removed"
}



export const getUserQueryOptions = () => queryOptions({
    queryKey: ["user-data"],
    queryFn: getProfileData
})

export const getUserFavouriteQueryOptions = () => queryOptions({
    queryKey: ["user-favourites"],
    queryFn: getUserFavouriteInfo
})

// export const updateFavouriteMutationOptions = (queryClient: QueryClient): UseMutationOptions<void, unknown, FavouritePayload, Context> => ({
//     mutationFn: async (payload) => {
//         await toggleUserFavourite(payload)
//     },

//     onMutate: async (payload: FavouritePayload) => {
//         await queryClient.cancelQueries({ queryKey: ["user-favourites"] });

//         const previousData = queryClient.getQueryData<IUserFavourite>(["user-favourites"])
        
//         const action = previousData?.data.favourites.some((item) => item.id === payload.id) 
//             ? "removed"
//             : "added"

//         queryClient.setQueryData(["user-favourites"], (old: IUserFavourite | undefined) => {
//             if (!old) return old;

//             const isExists = old.data.favourites.some((item) => item.id === payload.id)
//             return {
//                 ...old,
//                 data: {
//                     favourites: isExists
//                         ? old.data.favourites.filter((item) => item.id !== payload.id)
//                         : [...old.data.favourites, payload]
//                 }
//             }
//         })

//         return { previousData, action}
//     },

//     onError: (_err, _newData, context) => {
//         if (context?.previousData) {
//             queryClient.setQueryData(["user-favourites"], context.previousData);
//         }      
//     },

//     onSuccess: (_data, _variables, context) => {
//         const message = context.action === "added" ? "Movie added to favourites" : "Movie removed from favourites"
//         toast.success(message);
//     },

//     onSettled: () => {  
//         queryClient.invalidateQueries({queryKey: ["user-favourites"]})
//     }
// })

export const toggleFavouriteMutationOptions = (): UseMutationOptions<void, unknown, FavouritePayload, Context> => ({
    mutationFn: async (payload) => {
        await toggleUserFavourite(payload)
    },
    onMutate: (payload) => {
        const previousData = useFavouriteStore.getState().favourites

        const action = previousData.some((item) => item.id === payload.id) 
            ? "removed"
            : "added"

        useFavouriteStore.getState().toggleFavourite(payload)

        return { previousData, action }
    },
    onError: (_error, _newData, context) => {
        if (context) {
            useFavouriteStore.getState().setFavourites(context.previousData)
            toast.error("Could not update favourites. Please try again.");
        } 
    },
    onSuccess: (_data, _variables, context) => {
        const message = context.action === "added" ? "Movie added to favourites" : "Movie removed from favourites"
        toast.success(message);
    },
})