
export const setCartNfts = (params) => {
    return async (dispatch) => dispatch({
        type: "SET_CART",
        data: params,
    })
}

export const setAddCartBoxState = (para) => {
    return async (dispatch) => dispatch({
        type: "CART_STORE",
        data: para
    })
}

export const setAddedItemsTotalPrice = (para) => {
    return async (dispatch) => dispatch({
        type: "SET_ADDED_ITEMS_TOTAL_PRICE",
        data: para
    })
}

export const setslidestate = (para) => {
    return async (dispatch) => dispatch({
        type: "SET_SLIDE_STATE",
        data: para
    })
}
export const saveTab = (para) => {
    return async (dispatch) => dispatch({
        type: "SET_TAB",
        data: para
    })
}