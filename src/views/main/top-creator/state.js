import {useQuery} from "@tanstack/react-query";
import {queryKey} from "../../../utils/queryKey";
import {getTopCreators} from "./data";

export const useTopCreators = () => {
    return useQuery([queryKey.TOP_CREATORS], getTopCreators);
}