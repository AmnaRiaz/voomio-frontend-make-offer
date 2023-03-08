import {api} from "../../../services/api/api";
import {endpoints} from "../../../services/api/endpoints";

export const getTopCreators = () => {
    return api.get(endpoints.TOP_CREATORS).then(res => res.data);
}