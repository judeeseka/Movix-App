import { queryOptions } from "@tanstack/react-query";
import { getProfileData } from "./client";

export const getUserQueryOptions = () => queryOptions({
    queryKey: ["user-data"],
    queryFn: getProfileData
})