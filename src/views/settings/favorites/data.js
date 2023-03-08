import {endpoints} from "../../../services/api/endpoints";
import {api} from "../../../services/api/api";

export const getFavorites = () => {
    return api.get(endpoints.FAVORITES).then(res => res.data);
}