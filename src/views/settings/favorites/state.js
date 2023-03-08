import {useQuery} from "@tanstack/react-query";
import {getFavorites} from "./data";
import {queryKey} from "../../../utils/queryKey";

export const useFavorites = () => {
    return useQuery([queryKey.FAVORITES], getFavorites, {select: data => data.data})
}