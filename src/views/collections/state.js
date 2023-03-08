import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../../utils/queryKey";
import {
    getAllCollections,
    getCollectionItems,
    gettoplCollections,
    gettrendlCollections,
    getalltrendlCollections,
    getalltoplCollections,
    getallnfts,
    getalltopprice
} from "./data";

export const useAllCollections = (page, pageSize, categories, blockchain, name) => {
    return useQuery(
        [queryKey.COLLECTIONS, page, pageSize, categories, blockchain, name],
        () => getAllCollections(page, pageSize, categories, blockchain, name)
    )
}

export const useCollectionItems = (name, pageSize, collectionId) => {
    return useQuery(
        [queryKey.COLLECTIONS, collectionId, pageSize, name],
        () => getCollectionItems(name, pageSize, collectionId)
    )
}

export const getTopCollections = (page, pageSize, categories, blockchain, name, hour) => {
    return useQuery(
        [queryKey.TOPCOLLECTIONS, page, pageSize, categories, blockchain, name, hour],
        () => gettoplCollections(page, pageSize, categories, blockchain, name, hour)
    )
}
export const getTrendCollections = (page, pageSize, categories, blockchain, name, hour) => {
    return useQuery(
        [queryKey.TRENDINGCOLLECTIONS, page, pageSize, categories, blockchain, name, hour],
        () => gettrendlCollections(page, pageSize, categories, blockchain, name, hour)
    )
}
export const getAllTopCollections = (page, pageSize, categories, blockchain, name) => {
    return useQuery(
        [queryKey.ALLTOPCOLLECTIONS, page, pageSize, categories, blockchain, name],
        () => getalltoplCollections(page, pageSize, categories, blockchain, name)
    )
}
export const getAllTrendCollections = (page, pageSize, categories, blockchain, name) => {
    return useQuery(
        [queryKey.ALLTRENDINGCOLLECTIONS, page, pageSize, categories, blockchain, name],
        () => getalltrendlCollections(page, pageSize, categories, blockchain, name)
    )
}
export const getAllNfts = (page, pageSize, id, name) => {
    return useQuery(
        [queryKey.ALLNFTS, page, pageSize, id, name],
        () => getallnfts(page, pageSize, id, name)
    )
}