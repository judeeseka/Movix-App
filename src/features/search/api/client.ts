import axios from "axios";
import type { ISearch } from "../types/types";

const searchApi = axios.create({
    baseURL: "http://localhost:3000/api/search"
})

export const getMiniSearchResult = async (query: string) => {
    const response = await searchApi.get<ISearch>("/multi", {
        params: {
            query
        }
    })

    return response.data.data
}