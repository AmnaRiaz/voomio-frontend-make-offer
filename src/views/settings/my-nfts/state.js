import {useQuery} from "@tanstack/react-query";
import {queryKey} from "../../../utils/queryKey";
import {getMyNFTs} from "./data";
import {useSelector} from "react-redux";

export const useMyNFTs = (page, pageSize, name, network, categories) => {
    const userData = useSelector(state => state.user)

    return useQuery(
        [queryKey.MY_NFTS, page, pageSize, userData?.user?._id, name, network, categories],
        () => getMyNFTs(page, pageSize, userData.user._id, name, network, categories)
    )
}