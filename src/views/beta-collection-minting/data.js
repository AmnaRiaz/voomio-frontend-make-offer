import {api} from "../../services/api/api";

export const betaCollectionMinting = (body) => {
    return api.post('/form/beta-tester', body);
}