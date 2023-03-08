import {getMyTransactions} from "./data";
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {queryKey} from "../../../utils/queryKey";

export const useMyTransactions = (page, pageSize) => {
    const userID = useSelector(state => state.user.user._id);

    return useQuery([queryKey.MY_TRANSACTIONS,page, pageSize, userID], () => getMyTransactions(page, pageSize, userID))
}