const Collections = (
    state = {
        collection: [],
        selected: null,
        filterCollection: [],
        nftList: {
            list: [],
            totalDocuments: 0,
            totalPages: 1
        },
        searchNftList: {
            list: [],
            totalDocuments: 0,
            totalPages: 1,
            filter: {}
        },
        totalDocuments: 0,
        totalPages: 1
    },
    action
) => {
    switch (action.type) {
        case "SET_COLLECTION": {
            return {
                ...state,
                ...action.data,
                filterCollection: action.data.collection
            }
        }
        case "SEARCH_COLLECTION": {
            return {
                ...state,
                filterCollection: action.data
            }
        }
        case "SELECT_COLLECTION": {
            return {
                ...state,
                selected: action.data
            }
        }
        case "SET_NFT_LIST": {
            return {
                ...state,
                nftList: action.data
            }
        }
        case "SET_SEARCH_NFT": {
            return {
                ...state,
                searchNftList: { ...action.data, filter: action.filter }
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default Collections
