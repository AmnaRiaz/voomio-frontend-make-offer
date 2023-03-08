import { endpoints } from "../../services/api/endpoints";
import { api } from "../../services/api/api";
import { useDispatch } from "react-redux";
import { setFavoriteNfts } from "../../redux/actions/nfts";

export const addToFavoritesNFT = (nftID) => {
    // const dispatch = useDispatch()
    const state = api.post(endpoints.ADD_TO_FAVORITES_NFT(nftID))
    // dispatch(setFavoriteNfts({ favoritestate: { nftID, state } }))
    return state
}

export const removeFromFavoritesNFT = (nftID) => {
    return api.post(endpoints.REMOVE_FROM_FAVORITES_NFT(nftID))
}