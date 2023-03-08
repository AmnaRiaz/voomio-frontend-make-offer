import {useQuery} from "@tanstack/react-query";
import {queryKey} from "../../../utils/queryKey";
import {getMyCollections} from "./data";
import {useSelector} from "react-redux";

export const useMyCollections = (page, pageSize, blockchain, categories, name) => {
    const userData = useSelector(state => state.user);

    return useQuery(
        [queryKey.MY_COLLECTIONS, page, pageSize, name, blockchain, categories]
        , () => getMyCollections(userData.user._id, page, pageSize, blockchain, categories, name)
    )
}