import {useMutation} from "@tanstack/react-query";
import {betaCollectionMinting} from "./data";
import {toast} from "react-toastify";

export const useBetaCollectionMinting = () => {
    return useMutation(betaCollectionMinting, {
        onSuccess: (res) => {
            toast.success(res.data.message)
        }
    })
}