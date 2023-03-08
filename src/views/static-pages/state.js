import {queryKey} from "../../utils/queryKey";
import {useQuery} from "@tanstack/react-query";
import {getPageData} from "./data";

export const usePageData = (url) => {
    return useQuery([queryKey.PAGE_DATA, url], () => getPageData(url), {
        select: data => data.data
    })
}