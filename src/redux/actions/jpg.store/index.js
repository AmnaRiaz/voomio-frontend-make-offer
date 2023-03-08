import { getAxiosInstance } from "../../../services";

export const getJpgStoreItems = async ({ policyId, sortBy, pagination, minPrice, maxPrice, nameQuery = '', saleType = 'default', traits = '{}' }) => {
    const axiosInstance = getAxiosInstance();
    const url = `https://server.jpgstoreapis.com/search/tokens?policyIds=[%22${policyId}%22]&saleType=${saleType}&sortBy=${sortBy}&traits=${traits}&listingTypes=[%22ALL_LISTINGS%22]&nameQuery=${nameQuery}&verified=default&onlyMainBundleAsset=false&size=20` + ((minPrice === 0 || minPrice === '') && (maxPrice === 0 || maxPrice === '') ? '' : `&minPrice=${minPrice}&maxPrice=${maxPrice}`) + (pagination ? '&pagination=' + JSON.stringify(pagination) : '');
    const result = await axiosInstance
        .get(url)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });

    return result
}

export const getJpgStorePriceRange = async (policyId) => {
    const axiosInstance = getAxiosInstance();
    const url = `https://server.jpgstoreapis.com/collection/${policyId}/price-range`;
    const result = await axiosInstance
        .get(url)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });

    return result
}

export const getJpgStoreCollectionTransactions = async ({ policyId, page = 1, nameQuery = '', traits = '{}' }) => {
    const axiosInstance = getAxiosInstance();
    const url = `https://server.jpgstoreapis.com/collection/${policyId}/transactions?page=${page}&count=50&name=${nameQuery}&traits=${traits}`;
    const result = await axiosInstance
        .get(url)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });

    return result
}

export const getJpgStorePriceHistory = async (policyId) => {
    const axiosInstance = getAxiosInstance();
    const url = `https://server.jpgstoreapis.com/collection/${policyId}/price-history`;
    const result = await axiosInstance
        .get(url)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });

    return result
}

export const getJpgStoreNftDetails = async (assetId) => {
    const axiosInstance = getAxiosInstance();
    const url = `https://server.jpgstoreapis.com/token/${assetId}`;
    const result = await axiosInstance
        .get(url)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });

    return result
}

export const getJpgStoreNftOwner = async (assetId) => {
    try {
        const axiosInstance = getAxiosInstance();
        const url = `https://server.jpgstoreapis.com/blockfrost`;
        const result = await axiosInstance
            .post(url, {
                url: "/assets/" + assetId + '/addresses'
            })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => {
                Promise.reject(error);
            });

        return result[0];
    } catch (e) {
        return {};
    }
}

export const getJpgStoreUserProfile = async (addr) => {
    const axiosInstance = getAxiosInstance();
    const url = `https://server.jpgstoreapis.com/user/${addr}/profile`;
    const result = await axiosInstance
        .get(url)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });

    return result
}

export const getJpgStoreNftPriceHistory = async (assetId) => {
    const axiosInstance = getAxiosInstance();
    const url = `https://server.jpgstoreapis.com/token/${assetId}/price-history`;
    const result = await axiosInstance
        .get(url)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });

    return result
}

export const getJpgStoreNftActivity = async ({ assetId, offset = 0, limit = 5 }) => {
    const axiosInstance = getAxiosInstance();
    const url = `https://server.jpgstoreapis.com/token/${assetId}/tx-history?limit=${limit}&offset=${offset}`;
    const result = await axiosInstance
        .get(url)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });

    return result
}

export const getJpgStoreTransactionBuild = async ({
    action,
    address,
    assets,
    collateral,
    listingId,
    tracingId,
    utxos
}) => {
    const axiosInstance = getAxiosInstance();
    const url = `https://server.jpgstoreapis.com/transaction/build`;
    const data = {
        action,
        address,
        assets,
        collateral,
        listingId,
        tracingId,
        utxos
    }
    const buildResult = await axiosInstance
        .post(url, data)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.resolve(error.response.data));
    console.log(buildResult);
    return buildResult;
}