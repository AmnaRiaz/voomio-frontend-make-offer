import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../../utils/queryKey";
import { getAllNFTs } from "./data";

export const useAllNFTs = (page, pageSize, name, price, currency, networks, categories) => {
    return useQuery(
        [queryKey.NFTS, page, pageSize, name, networks, categories],
        () => getAllNFTs(page, pageSize, name, price, currency, networks, categories)
    )
}