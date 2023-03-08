import { axiosServices, getAxiosInstance, getHeaders } from "../../../services"
import { notification } from "../../../utils/utility";
import { setLocalStorageItem } from "../../../utils/utility"


export const getTopAllCollection = async (data) => {
    const axiosInstance = getAxiosInstance();
    const all = await axiosInstance.post('collection/alltop', data, getHeaders)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            // notification(error?.message, "error");
            return false
        });
    return all

}
export const getTrendingCollections = async (data) => {
    const axiosInstance = getAxiosInstance();
    const all = await axiosInstance.post('collection/alltrending', data, getHeaders)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            // notification(error?.message, "error");
            return false
        });
    return all

}
export const gettopprice = async (data) => {
    const axiosInstance = getAxiosInstance();
    const all = await axiosInstance.post('collection/topprice', data, getHeaders)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            // notification(error?.message, "error");
            return false
        });
    return all

}
export const getalltrendingprice = async (data) => {
    const axiosInstance = getAxiosInstance();
    const all = await axiosInstance.post('collection/alltrendingprice', data, getHeaders)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            // notification(error?.message, "error");
            return false
        });
    return all

}

export const getTopCreators = async (data) => {
    const axiosInstance = getAxiosInstance();
    const topCreators = await axiosInstance.get('user/top', getHeaders)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            // notification(error?.message, "error");
            return false
        });
    return topCreators

}

export const getMyNftsByCollection = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = '/nft?query=' + JSON.stringify(data);
    const response = await axiosInstance.
        get(url, getHeaders)
        .then((response) => {
            return response?.data
        })
        .catch((error) => {
            // notification(error?.message, "error");
            return false
        });
    return response
};


export const getFavoriteAction = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = `/get-favourite-nft?userId=${data.userId}`;
    const response = await axiosInstance.get(url, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return response;
};

export const removeFavoriteAction = async (params) => {
    const axiosInstance = getAxiosInstance();
    const url = "/remove-favourite-nft"
    const response = await axiosInstance.
        post(url, params, getHeaders)
        .then((response) => {
            return response?.data
        })
        .catch((error) => {
            // notification(error?.message, "error");
            return false
        });
    return response
}

export const setFavoriteAction = async (params) => {
    const axiosInstance = getAxiosInstance();
    const url = "/user/favourite-nft"
    const response = await axiosInstance.
        post(url, params, getHeaders)
        .then((response) => {
            return response?.data.data
        })
        .catch((error) => {
            // notification(error?.message, "error");
            return false
        });
    return response
}

export const addViewer = async (params) => {
    const axiosInstance = getAxiosInstance();
    const url = "/nft/view"
    const response = await axiosInstance.
        post(url, params, getHeaders)
        .then((response) => {
            return response?.data.data;
        })
        .catch((error) => {
            // notification(error?.message, "error");
            return false
        });
    return response
}

export const getNftById = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = `/nft/${data.contentId}`;
    const nftResponse = await axiosInstance
        .get(url, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return nftResponse;
};

export const updateNft = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = '/update-nft';
    const nftResponse = await axiosInstance
        .put(url, data, getHeaders)
        .then((response) => {
            if (response.data.success === false)
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('Update database failed');
            return Promise.resolve(response.data);
        })
        .catch((error) => Promise.reject(error));
    return nftResponse;
};

export const getCollectionById = async (id) => {
    const axiosInstance = getAxiosInstance();
    const url = `/collection/${id}`;
    const collectionResponse = await axiosInstance
        .get(url, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return collectionResponse;
};

export const getAssetsDetail = async (assetId) => {
    const axiosInstance = getAxiosInstance();
    const url = "/nft/" + assetId;
    const nftResponse = await axiosInstance
        .get(url, getHeaders())
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));

    return nftResponse;
}

export const getAllCollection = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = `/collection?page=${data.page || 1}&size=${data.limit || 25}&query=` + JSON.stringify(data.query);
    const response = await axiosInstance.get(url, getHeaders).then((response) => {
        return response.data
    }).catch((error) => {
        // notification(error?.message, "error");
        return []
    });

    return response;
}

export const searchCollectionAndNft = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = 'collection/totalfilter';
    const response = await axiosInstance.post(url, data, getHeaders).then((response) => {
        return response.data
    }).catch((error) => {
        // notification(error?.message, "error");
        return []
    });

    return response;
}

export const getAllNfts = async (page, query, sort) => {
    const axiosInstance = getAxiosInstance();
    const url = '/nft';
    const result = await axiosInstance
        .get(url, {
            params: {
                size: 20,
                page: page,
                query: query
            }
        }, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });
    return result
}


export const getAllListings = async (page, query, sort) => {
    const axiosInstance = getAxiosInstance();
    const url = '/auction';
    // const url = '/auction';
    const result = await axiosInstance
        .get(url, {
            params: {
                page: page,
                query: query,
                sort: sort
            }
        }, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });
    return result
}

export const uploadMetaDataAction = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = '/file/ipfs/metadata';
    const result = await axiosInstance
        .post(url, data, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });
    return result
};

export const uploadImageToIpfs = async (data) => {
    const axiosInstance = getAxiosInstance();
    const formData = new FormData();
    formData.append('image', data);
    const url = '/file/ipfs';
    const imageData = await axiosInstance
        .post(url, formData, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });
    if (imageData) {
        return imageData;
    } else {
        return false
    }
};

export const addCollection = async (data) => {
    if (data.name.length == 0) {
        return false;
    }
    const axiosInstance = getAxiosInstance();
    const url = '/collection';
    const collectionResponse = await axiosInstance
        .post(url, data, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    if (collectionResponse) {
        return collectionResponse
    } else {
        return false
    }
};

export const addNft = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = '/nft';
    const policyIdResponse = await axiosInstance
        .post(url, data, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return policyIdResponse;
};

export const addBuySell = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = 'auction/open';
    const policyIdResponse = await axiosInstance
        .post(url, data, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return policyIdResponse;
};

export const buyNFTAction = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = 'nft/buy';
    const policyIdResponse = await axiosInstance
        .post(url, data, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return policyIdResponse;
};

export const makeOfferAction = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = 'nft/makeoffer';
    const policyIdResponse = await axiosInstance
        .post(url, data, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return policyIdResponse;
};

export const updatePriceAction = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = 'nft/update-price';
    const policyIdResponse = await axiosInstance
        .post(url, data, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return policyIdResponse;
};

export const getalltopprice = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = 'collection/alltopprice';
    const price = await axiosInstance
        .post(url, data, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return price;
};
export const useAllNFTs = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = 'nft';
    const price = await axiosInstance
        .get(url, {
            params: {
                page: data.page,
                query: data.query,
                size: data.size
            },
            headers: getHeaders()
        })
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return price;
};
export const getTransactionsByUser = async (data) => {
    const axiosInstance = getAxiosInstance();
    const url = 'transaction/user';
    const price = await axiosInstance
        .post(url, data, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return price;
};
