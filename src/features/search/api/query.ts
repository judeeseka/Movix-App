import { queryOptions } from "@tanstack/react-query";
import { getMiniSearchResult } from "./client";

export const getMiniSearchQueryOptions = (query: string) => 
    queryOptions({
        queryKey: ["mini-search", query],
        queryFn: () => getMiniSearchResult(query)
    }) 