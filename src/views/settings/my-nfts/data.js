import {api} from "../../../services/api/api";
import {endpoints} from "../../../services/api/endpoints";

export const getMyNFTs = (page, pageSize, userID, name, network, categories) => {
    return api.get(endpoints.NFTS, {
        params: {
            page,
            size: pageSize,
            ownedBy: userID,
            name
        }
    }).then(res => res.data)
}