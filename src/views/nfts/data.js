import {endpoints} from "../../services/api/endpoints";
import {api} from "../../services/api/api";

export const getAllNFTs = (page, pageSize, name, price, currency, networks, categories) => {
    return api.get(endpoints.NFTS, {
        params: {
            page,
            size: pageSize,
            name,
            price,
            currency,
            networks,
            categories
        }
    }).then(res => res.data)
}