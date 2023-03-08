import { combineReducers } from "redux"
import auth from "./auth"
import nfts from "./nfts"
import user from "./user"
import wallet from "./wallet"
import collections from "./collection"

const rootReducer = combineReducers({
    auth,
    nfts,
    user,
    wallet,
    collections
})

export default rootReducer
