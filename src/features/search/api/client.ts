import type { ISearch } from "../types/types";
import { api } from "@/lib/axios";

export const getMiniSearchResult = async (query: string) => {
    const response = await api.get<ISearch>("/search/multi", {
        params: {
            query
        }
    })

    return response.data.data
}