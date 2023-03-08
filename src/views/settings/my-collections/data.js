import {api} from "../../../services/api/api";
import {endpoints} from "../../../services/api/endpoints";

export const getMyCollections = (userID , page = 1, pageSize = 10, blockchain = 'all', categories = 'all', name) => {
    return api.get(endpoints.COLLECTIONS, {
        params: {
            page,
            size: pageSize,
            query: {
                blockchain,
                categories,
                nameQuery: name,
                createdBy: userID
            }
        }
    }).then(res => res.data);
}