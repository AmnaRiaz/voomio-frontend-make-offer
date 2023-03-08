import {useAsyncSwitch} from "../../hooks/useAsyncSwitch";
import {addToFavoritesNFT, removeFromFavoritesNFT} from "./data";

export const useAddToFavorites = (nftID, initialState) => {
    const [, isFavorite, handleSwitch] = useAsyncSwitch(initialState);

    return {
        isFavorite,
        add: () => handleSwitch(() => addToFavoritesNFT(nftID)),
        remove: () => handleSwitch(() => removeFromFavoritesNFT(nftID))
    }
}
