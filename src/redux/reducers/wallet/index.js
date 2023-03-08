import * as types from "../../types/walletTypes";

let walletobj = {
  connected: false,
  loading: false,
  data: {
    assets: {},
  },
  nami: {
    collateral: [],
  },
  loaded_assets: false,
};

const Wallet = (state = walletobj, action) => {
  switch (action.type) {
    case "SET_WALLET": {
      return {
        ...state,
        ...action.data,
      };
    }
    case types.WALLET_CONNECTED:
      return {
        ...state,
        connected: true,
        loading: false,
        data: payload.data,
        provider: payload.provider,
        // events: payload.database.events,
        // offers: payload.database.offers,
      };

    case types.SET_WALLET_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case types.SET_WALLET_DATA:
      return {
        ...state,
        loading: false,
        data: payload,
        loaded_assets: true,
      };

    case types.ADD_WALLET_ASSET:
      console.log(1, payload);
      console.log(2, state.data.assets);
      return {
        ...state,
      };

    default: {
      return { ...state };
    }
  }
};

export default Wallet;
