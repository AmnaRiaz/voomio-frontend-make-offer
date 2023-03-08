import {endpoints} from "../../../services/api/endpoints";
import {api} from "../../../services/api/api";

export const getMyTransactions = (page, pageSize, userID) => {
    return api.get(endpoints.TRANSACTIONS, {
        params: {
            page,
            size: pageSize,
            query: {
                createdBy: userID,
                blockchain: 'all'
            }
        }
    }).then(res => res.data)
}