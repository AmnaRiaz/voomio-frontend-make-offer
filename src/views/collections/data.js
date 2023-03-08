import { api } from "../../services/api/api";
import { endpoints } from "../../services/api/endpoints";

export const getAllCollections = (page, pageSize, categories, blockchain, name) => {
    return api.get(endpoints.COLLECTIONS, {
        params: {
            page,
            size: pageSize,
            query: {
                categories,
                blockchain,
                nameQuery: name,
            }
        }
    }).then(res => res.data)
}

export const gettoplCollections = (page, pageSize, categories, blockchain, name, hour) => {
    return api.get(endpoints.TOPCOLLECTIONS, {
        params: {
            page,
            size: pageSize,
            query: {
                categories,
                blockchain,
                nameQuery: name,
            },
            hour
        }
    }).then(res => res.data)
}

export const gettrendlCollections = (page, pageSize, categories, blockchain, name, hour) => {
    return api.get(endpoints.TRENDINGCOLLECTIONS, {
        params: {
            page,
            size: pageSize,
            query: {
                categories,
                blockchain,
                nameQuery: name,
            },
            hour
        }
    }).then(res => res.data)
}
export const getalltoplCollections = (page, pageSize, categories, blockchain, name) => {
    return api.get(endpoints.ALLTOPCOLLECTIONS, {
        params: {
            page,
            size: pageSize,
            query: {
                categories,
                blockchain,
                nameQuery: name,
            },
        }
    }).then(res => res.data)
}

export const getalltrendlCollections = (page, pageSize, categories, blockchain, name) => {
    return api.get(endpoints.ALLTRENDINGCOLLECTIONS, {
        params: {
            page,
            size: pageSize,
            query: {
                categories,
                blockchain,
                nameQuery: name,
            },
        }
    }).then(res => res.data)
}
export const getallnfts = (page, pageSize, id, name) => {
    return api.get(endpoints.ALLNFTS, {
        params: {
            page,
            size: pageSize,
            query: {
                createdBy: id,
                nameQuery: name,
            },
        }
    }).then(res => res.data)
}

export const getCollectionItems = (name, pageSize, collectionId) => {
    return api.get(endpoints.NFTS, {
        params: {
            size: pageSize,
            query: {
                collectionId,
                name
            }
        }
    }).then(res => res.data)
}