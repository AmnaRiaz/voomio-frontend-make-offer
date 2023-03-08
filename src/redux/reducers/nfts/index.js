const Nfts = (
    state = {
        polycartNfts: [], opencartNfts: [], jpgcartNfts: [], solcartNfts: [], boxstate: false, polyprice: 0, jpgprice: 0, solprice: 0, openseaprice: 0, slidestate: true, xxx: {}, tab: "1"
    },
    action
) => {
    switch (action.type) {
        case "SET_CART": {
            return {
                ...state,
                ...action.data
            }
        }
        case "CART_STORE": {
            return {
                ...state,
                ...action.data
            }
        }
        case "SET_ADDED_ITEMS_TOTAL_PRICE": {
            return {
                ...state,
                ...action.data
            }
        }
        case "SET_SLIDE_STATE": {
            return {
                ...state,
                ...action.data
            }
        }
        case "SET_XXX": {
            return {
                ...state,
                ...action.data
            }
        }
        case "SET_TAB": {
            return {
                ...state,
                ...action.data
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default Nfts
