import React from "react";
import { Tab, Tabs, RadioGroup, Radio } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../../node_modules/normalize.css/normalize.css";
import Cardano from "./serialization-lib/index";
import { contractAddress } from "./market-contract/validator";
import { fromHex, fromBech32, arrayToBytes } from "../utils/converter";
import { createEvent, createDatum } from "../utils/factory";
import { createTxUnspentOutput } from "./transaction";
import Wallet from "./wallet/index";
import {
  getLockedUtxos,
  getAssetDetails,
  getTxMetadata,
  getLockedUtxosByAsset,
} from "./blockfrost-api";
import {
  purchaseAsset,
  listAsset,
  cancelListing,
} from "./market-contract/index";
import { getWalletAssets } from "../redux/store/wallet/api";
import { getAssets } from "../database/assets";
import Contracts from "./market-contract/plutus";
import { marketAddress, marketFeeAddress, MARKET_TYPE } from "../config";
let Buffer = require("buffer/").Buffer;

export default class Dapp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTabId: "1",
      whichWalletSelected: "nami",
      walletFound: false,
      walletIsEnabled: false,
      walletName: undefined,
      walletIcon: undefined,
      walletAPIVersion: undefined,

      networkId: undefined,
      Utxos: undefined,
      CollatUtxos: undefined,
      balance: undefined,
      balanceValue: undefined,
      multiAssets: undefined,
      changeAddress: undefined,
      rewardAddress: undefined,
      usedAddress: undefined,

      submittedTxHash: "",

      saleDetails: undefined,
      datumHash: undefined,
      asset: undefined,
      validAssets: [],
      tokenSale: "",
      tokenForSale: "",
      sellerAddress: undefined,
      royaltiesAddress: undefined,
    };

    /**
     * When the wallet is connect it returns the connector which is
     * written to this API variable and all the other operations
     * run using this API object
     */
    this.API = undefined;

    /**
     * Protocol parameters
     * @type {{
     * keyDeposit: string,
     * coinsPerUtxoWord: string,
     * minUtxo: string,
     * poolDeposit: string,
     * maxTxSize: number,
     * priceMem: number,
     * maxValSize: number,
     * linearFee: {minFeeB: string, minFeeA: string}, priceStep: number
     * }}
     */
    this.protocolParams = {
      linearFee: {
        minFeeA: "44",
        minFeeB: "155381",
      },
      minUtxo: "34482",
      poolDeposit: "500000000",
      keyDeposit: "2000000",
      maxValSize: 5000,
      maxTxSize: 16384,
      priceMem: 0.0577,
      priceStep: 0.0000721,
      coinsPerUtxoWord: "34482",
    };
    this.DATUM_TYPE = {
      SellOffer: 0,
      BuyOffer: 1,
      Close: 2,
    };
  }

  /**
   * Handles the tab selection on the user form
   * @param tabId
   */
  handleTabId = (tabId) => this.setState({ selectedTabId: tabId });

  /**
   * Handles the radio buttons on the form that
   * let the user choose which wallet to work with
   * @param obj
   */
  handleWalletSelect = (obj) => {
    const whichWalletSelected = obj.target.value;
    this.setState({ whichWalletSelected }, () => {
      this.refreshData();
    });
  };

  /**
   * Checks if the wallet is running in the browser
   * Does this for Nami, CCvault and Flint wallets
   * @returns {boolean}
   */

  checkIfWalletFound = () => {
    let walletFound = false;

    const wallet = this.state.whichWalletSelected;
    if (wallet === "nami") {
      walletFound = !!window?.cardano?.nami;
    } else if (wallet === "ccvault") {
      walletFound = !!window?.cardano?.ccvault;
    } else if (wallet === "flint") {
      walletFound = !!window?.cardano?.flint;
    }

    this.setState({ walletFound });
    return walletFound;
  };

  /**
   * Checks if a connection has been established with
   * the wallet
   * @returns {Promise<boolean>}
   */
  checkIfWalletEnabled = async () => {
    let walletIsEnabled = false;

    try {
      const wallet = this.state.whichWalletSelected;
      if (wallet === "nami") {
        walletIsEnabled = await window.cardano.nami.isEnabled();
      } else if (wallet === "ccvault") {
        walletIsEnabled = await window.cardano.ccvault.isEnabled();
      } else if (wallet === "flint") {
        walletIsEnabled = await window.cardano.flint.isEnabled();
      }

      this.setState({ walletIsEnabled });
    } catch (err) {
      console.log(err);
    }

    return walletIsEnabled;
  };

  /**
   * Enables the wallet that was chosen by the user
   * When this executes the user should get a window pop-up
   * from the wallet asking to approve the connection
   * of this app to the wallet
   * @returns {Promise<void>}
   */

  enableWallet = async () => {
    try {
      const wallet = this.state.whichWalletSelected;
      if (wallet === "nami") {
        this.API = await window.cardano.nami.enable();
      } else if (wallet === "ccvault") {
        this.API = await window.cardano.ccvault.enable();
      } else if (wallet === "flint") {
        this.API = await window.cardano.flint.enable();
      }

      await this.checkIfWalletEnabled();
      await this.getNetworkId();
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Get the API version used by the wallets
   * writes the value to state
   * @returns {*}
   */
  getAPIVersion = () => {
    let walletAPIVersion;

    const wallet = this.state.whichWalletSelected;
    if (wallet === "nami") {
      walletAPIVersion = window?.cardano?.nami.apiVersion;
    } else if (wallet === "ccvault") {
      walletAPIVersion = window?.cardano?.ccvault.apiVersion;
    } else if (wallet === "flint") {
      walletAPIVersion = window?.cardano?.flint.apiVersion;
    }

    this.setState({ walletAPIVersion });
    return walletAPIVersion;
  };

  /**
   * Get the name of the wallet (nami, ccvault, flint)
   * and store the name in the state
   * @returns {*}
   */

  getWalletName = () => {
    let walletName;

    const wallet = this.state.whichWalletSelected;
    if (wallet === "nami") {
      walletName = window?.cardano?.nami.name;
    } else if (wallet === "ccvault") {
      walletName = window?.cardano?.ccvault.name;
    } else if (wallet === "flint") {
      walletName = window?.cardano?.flint.name;
    }

    this.setState({ walletName });
    return walletName;
  };

  /**
   * Gets the Network ID to which the wallet is connected
   * 0 = testnet
   * 1 = mainnet
   * Then writes either 0 or 1 to state
   * @returns {Promise<void>}
   */
  getNetworkId = async () => {
    try {
      const networkId = await this.API.getNetworkId();
      this.setState({ networkId });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Gets the UTXOs from the user's wallet and then
   * stores in an object in the state
   * @returns {Promise<void>}
   */

  getUtxos = async () => {
    let Utxos = [];

    try {
      const rawUtxos = await this.API.getUtxos();
      console.log(rawUtxos);

      for (const rawUtxo of rawUtxos) {
        const utxo = Cardano.Instance.TransactionUnspentOutput.from_bytes(
          fromHex(rawUtxo)
        );
        console.log(utxo);
        const input = utxo.input();
        const txid = Buffer.from(
          input.transaction_id().to_bytes(),
          "utf8"
        ).toString("hex");
        const txindx = input.index();
        const output = utxo.output();
        const amount = output.amount().coin().to_str(); // ADA amount in lovelace
        const multiasset = output.amount().multiasset();
        console.log(multiasset);
        let multiAssetStr = "";

        if (multiasset) {
          const keys = multiasset.keys(); // policy Ids of thee multiasset
          const N = keys.len();
          // console.log(`${N} Multiassets in the UTXO`)

          for (let i = 0; i < N; i++) {
            const policyId = keys.get(i);
            const policyIdHex = Buffer.from(
              policyId.to_bytes(),
              "utf8"
            ).toString("hex");
            // console.log(`policyId: ${policyIdHex}`)
            const assets = multiasset.get(policyId);

            const assetNames = assets.keys();
            const K = assetNames.len();
            // console.log(`${K} Assets in the Multiasset`)

            for (let j = 0; j < K; j++) {
              const assetName = assetNames.get(j);
              // console.log(assets.get(assetName));
              // console.log(assetName);
              const assetNameString = Buffer.from(
                assetName.name(),
                "utf8"
              ).toString();
              // console.log(assetNameString)
              // console.log(assets.get(assetName).to_str());
              const assetNameHex = Buffer.from(
                assetName.name(),
                "utf8"
              ).toString("hex");
              const multiassetAmt = assets.get(assetName);
              multiAssetStr += `+ ${multiassetAmt.to_str()} + ${policyIdHex}.${assetNameHex} (${assetNameString})`;
              // console.log(assetNameString)
              // console.log(`Asset Name: ${assetNameHex}`)
            }
          }
        }

        const obj = {
          txid: txid,
          txindx: txindx,
          amount: amount,
          str: `${txid} #${txindx} = ${amount}`,
          multiAssetStr: multiAssetStr,
          TransactionUnspentOutput: utxo,
        };
        Utxos.push(obj);
        // console.log(`utxo: ${str}`)
      }
      this.setState({ Utxos });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * The collateral is need for working with Plutus Scripts
   * Essentially you need to provide collateral to pay for fees if the
   * script execution fails after the script has been validated...
   * this should be an uncommon occurrence and would suggest the smart contract
   * would have been incorrectly written.
   * The amount of collateral to use is set in the wallet
   * @returns {Promise<void>}
   */
  getCollateral = async () => {
    let CollatUtxos = [];

    try {
      let collateral = [];

      const wallet = this.state.whichWalletSelected;
      if (wallet === "nami") {
        collateral = await this.API.experimental.getCollateral();
      } else {
        collateral = await this.API.getCollateral();
      }

      for (const x of collateral) {
        const utxo = Cardano.Instance.TransactionUnspentOutput.from_bytes(
          Buffer.from(x, "hex")
        );
        CollatUtxos.push(utxo);
        // console.log(utxo)
      }
      this.setState({ CollatUtxos });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Gets the current balance of in Lovelace in the user's wallet
   * This doesnt resturn the amounts of all other Tokens
   * For other tokens you need to look into the full UTXO list
   * @returns {Promise<void>}
   */
  getBalance = async () => {
    try {
      const balanceCBORHex = await this.API.getBalance();
      const balanceValue = Cardano.Instance.Value.from_bytes(
        Buffer.from(balanceCBORHex, "hex")
      ).coin();
      const balance = Cardano.Instance.Value.from_bytes(
        Buffer.from(balanceCBORHex, "hex")
      )
        .coin()
        .to_str();
      const multiAssets = Cardano.Instance.Value.from_bytes(
        Buffer.from(balanceCBORHex, "hex")
      ).multiasset();
      console.log(multiAssets);
      this.setState({ balance, multiAssets, balanceValue });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Get the address from the wallet into which any spare UTXO should be sent
   * as change when building transactions.
   * @returns {Promise<void>}
   */
  getChangeAddress = async () => {
    try {
      const raw = await this.API.getChangeAddress();
      const changeAddress = Cardano.Instance.Address.from_bytes(
        Buffer.from(raw, "hex")
      ).to_bech32();
      this.setState({ changeAddress });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * This is the Staking address into which rewards from staking get paid into
   * @returns {Promise<void>}
   */
  getRewardAddresses = async () => {
    try {
      const raw = await this.API.getRewardAddresses();
      const rawFirst = raw[0];
      const rewardAddress = Cardano.Instance.Address.from_bytes(
        Buffer.from(rawFirst, "hex")
      ).to_bech32();
      // console.log(rewardAddress)
      this.setState({ rewardAddress });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Gets previsouly used addresses
   * @returns {Promise<void>}
   */
  getUsedAddresses = async () => {
    try {
      const raw = await this.API.getUsedAddresses();
      const rawFirst = raw[0];
      const usedAddress = Cardano.Instance.Address.from_bytes(
        Buffer.from(rawFirst, "hex")
      ).to_bech32();
      // console.log(rewardAddress)
      this.setState({ usedAddress });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Refresh all the data from the user's wallet
   * @returns {Promise<void>}
   */
  refreshData = async () => {
    try {
      const walletFound = this.checkIfWalletFound();
      if (walletFound) {
        await this.enableWallet();
        await this.getAPIVersion();
        await this.getWalletName();
        await this.getUtxos();
        await this.getCollateral();
        await this.getBalance();
        await this.getChangeAddress();
        await this.getRewardAddresses();
        await this.getUsedAddresses();
        await Wallet.getAvailableWallets();
        const walletAssets = await getWalletAssets();
        // console.log(walletAssets);
        const assets = (await getAssets(walletAssets)).reduce((map, asset) => {
          map[asset.details.asset] = asset;
          return map;
        }, {});

        let validAssets = [];
        for (const key in assets) {
          if (Object.hasOwnProperty.call(assets, key)) {
            validAssets.push(assets[key]);
          }
        }

        let tokenSale;
        if (validAssets.length > 0) {
          tokenSale = `${validAssets[0].details.assetName}`;
        } else {
          tokenSale = "";
        }

        // console.log(assets.valueOf());
        this.setState({
          validAssets,
          tokenSale,
        });
        console.log(validAssets);
        try {
          const latestSale = localStorage.getItem("latestSale");
          let latestSaleTransactionHash = "";
          if (latestSale) {
            latestSaleTransactionHash = JSON.parse(latestSale).txHash;
          }
          const listed = await getLockedUtxos(marketAddress, {});
          let index = 0;
          const lastSaleAsset = listed.find((listedAsset, ind) => {
            if (listedAsset.tx_hash == latestSaleTransactionHash) {
              index = ind;
              return true;
            }
          });
          if (!lastSaleAsset) {
            return;
          }
          const asset = lastSaleAsset["amount"]["1"]["unit"];
          console.log(asset);
          const assetDetails = await getAssetDetails(asset);
          // console.log(assetDetails);
          const txhash0 = listed[index]["tx_hash"];
          const txmetadata = await getTxMetadata(txhash0);
          const datumHash = listed[index]["data_hash"];

          console.log("txmetadata", txmetadata);
          let saleDetails,
            sellerAddress,
            sellerAddressHex,
            royaltiesAddress,
            royaltiesAddressHex,
            royaltiesAddressBytes,
            sellerAddressBytes;
          if (txmetadata["0"]) {
            saleDetails = txmetadata["0"]["json_metadata"];
            sellerAddressHex = txmetadata["1"]["json_metadata"];
            royaltiesAddressHex = txmetadata["2"]["json_metadata"];

            sellerAddressBytes = arrayToBytes(sellerAddressHex.sa32);
            sellerAddress = Cardano.Instance.Address.from_bytes(
              fromHex(sellerAddressBytes)
            );
            royaltiesAddressBytes = arrayToBytes(royaltiesAddressHex.ra32);
            royaltiesAddress = Cardano.Instance.Address.from_bytes(
              fromHex(royaltiesAddressBytes)
            );
          }

          console.log(saleDetails);
          this.setState({
            saleDetails,
            datumHash,
            asset,
            assetPolicyIdHex: assetDetails["policyId"],
            assetNameHex: assetDetails["assetName"],
            tokenForSale: saleDetails?.tn || "",
            royaltiesAddress,
            sellerAddress,
          });
        } catch (error) {
          console.error(error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    await Cardano.load();
    await this.refreshData();
  }

  render() {
    return (
      <div className="bg-white" style={{ margin: "20px" }}>
        <div style={{ paddingTop: "10px" }}>
          <RadioGroup
            label="Select Wallet:"
            onChange={this.handleWalletSelect}
            selectedValue={this.state.whichWalletSelected}
            inline={true}
          >
            <Radio label="Nami" value="nami" />
          </RadioGroup>
        </div>
        <button
          className="text-white mt-[20px] px-24 py-6 text-[30px] px-10 py-5 blue_button text-xl font-bold"
          onClick={this.refreshData}
        >
          Refresh
        </button>

        <p style={{ paddingTop: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Wallet Found: </span>
          {`${this.state.walletFound}`}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Wallet Connected: </span>
          {`${this.state.walletIsEnabled}`}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Wallet API version: </span>
          {this.state.walletAPIVersion}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Wallet name: </span>
          {this.state.walletName}
        </p>

        <p>
          <span style={{ fontWeight: "bold" }}>
            Network Id (0 = testnet; 1 = mainnet):{" "}
          </span>
          {this.state.networkId}
        </p>
        <p style={{ paddingTop: "20px" }}>
          <span style={{ fontWeight: "bold" }}>
            UTXOs: (UTXO #txid = ADA amount + AssetAmount + policyId.AssetName +
            ...):{" "}
          </span>
          {this.state.Utxos?.map((x) => (
            <li
              style={{ fontSize: "10px" }}
              key={`${x.str}${x.multiAssetStr}`}
            >{`${x.str}${x.multiAssetStr}`}</li>
          ))}
        </p>
        <p style={{ paddingTop: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Balance: </span>
          {this.state.balance}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Change Address: </span>
          {this.state.changeAddress}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Staking Address: </span>
          {this.state.rewardAddress}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Used Address: </span>
          {this.state.usedAddress}
        </p>
        <hr style={{ marginTop: "40px", marginBottom: "40px" }} />

        <Tabs
          id="TabsExample"
          vertical={true}
          onChange={this.handleTabId}
          selectedTabId={this.state.selectedTabId}
        >
          <Tab
            id="1"
            title="My assets"
            panel={<div style={{ marginLeft: "20px" }}></div>}
          />
          <Tab
            id="2"
            title="Cancel sell"
            panel={
              <div style={{ marginLeft: "20px" }}>
                <button
                  className="gray1_button"
                  onClick={async () => {
                    const shelleyChangeAddress =
                      Cardano.Instance.Address.from_bech32(
                        this.state.changeAddress
                      );
                    const sellerBaseAddress =
                      Cardano.Instance.BaseAddress.from_address(
                        shelleyChangeAddress
                      );
                    const wallet = {
                      data: { address: this.state.changeAddress },
                    };
                    const asset = {
                      status: {
                        datum: this.state.saleDetails,
                        datumHash: this.state.datumHash,
                        submittedBy: this.state.changeAddress,
                        artistAddress: this.state.changeAddress,
                      },
                      details: { asset: this.state.asset },
                    };

                    try {
                      await Wallet.getAvailableWallets();
                      const walletUtxos = await Wallet.getUtxos();
                      const contractVersion = "v1";

                      const assetUtxo = (
                        await getLockedUtxosByAsset(
                          contractAddress(contractVersion).to_bech32(),
                          asset.details.asset
                        )
                      ).find(
                        (utxo) => utxo.data_hash === asset.status.datumHash
                      );

                      if (assetUtxo) {
                        const txHash = await cancelListing(
                          asset.status.datum,
                          {
                            address: fromBech32(wallet.data.address),
                            utxos: walletUtxos,
                          },
                          await createTxUnspentOutput(
                            contractAddress(contractVersion),
                            assetUtxo
                          ),
                          contractVersion
                        );

                        if (txHash) {
                          console.log({
                            success: true,
                            type: MARKET_TYPE.DELIST,
                          });
                        } else {
                          console.log({ success: false });
                        }
                      } else {
                        console.log({ success: false });
                      }
                    } catch (error) {
                      console.error(
                        `Unexpected error in delistToken. [Message: ${error.message}]`
                      );
                      console.log({ success: false });
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            }
          />
          <Tab
            id="4"
            title="Send (Sell) Token to Plutus Script"
            panel={
              <div style={{ marginLeft: "20px" }}>
                <p style={{ paddingTop: "20px" }}>
                  <span style={{ fontWeight: "bold" }}>Token: </span>
                  {`${fromHex(this.state.tokenSale)}`}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Price: </span>
                  {`${100000000}`}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Contract: </span>
                  {`${Contracts["v1"].address}`}
                </p>

                <button
                  style={{ padding: "10px" }}
                  className="purple_button"
                  onClick={async () => {
                    const shelleyChangeAddress =
                      Cardano.Instance.Address.from_bech32(
                        this.state.changeAddress
                      );
                    const sellerBaseAddress =
                      Cardano.Instance.BaseAddress.from_address(
                        shelleyChangeAddress
                      );
                    const bench32 = sellerBaseAddress.to_address().to_bech32();
                    console.log(bench32);
                    const wallet = {
                      data: { address: this.state.changeAddress },
                    };

                    const asset = this.state.validAssets[0];
                    console.log(asset);

                    try {
                      await Wallet.getAvailableWallets();
                      // const collectionDetails = await getCollection(asset.details.policyId);
                      const walletUtxos = await Wallet.getUtxos();

                      const royaltiesAddress = wallet.data.address;
                      const royaltiesPercentage = 0;
                      const price = 100;

                      const datum = createDatum(
                        asset.details.assetName,
                        asset.details.policyId,
                        wallet.data.address,
                        royaltiesAddress,
                        royaltiesPercentage,
                        price
                      );
                      const datumsa32 = datum;
                      datumsa32.sa32 = wallet.data.address;
                      console.log(datumsa32);

                      const contractVersion =
                        process.env.NEXT_PUBLIC_CONTRACT_VERSION;

                      const listObj = await listAsset(
                        datum,
                        {
                          address: fromBech32(wallet.data.address),
                          utxos: walletUtxos,
                        },
                        contractVersion,
                        wallet.data.address,
                        royaltiesAddress
                      );

                      if (listObj && listObj.datumHash && listObj.txHash) {
                        console.log({
                          success: true,
                          type: MARKET_TYPE.NEW_LISTING,
                        });
                        localStorage.setItem(
                          "latestSale",
                          JSON.stringify(listObj)
                        );
                      } else {
                        console.log({ success: false });
                      }
                    } catch (error) {
                      console.error(
                        `Unexpected error in listToken. [Message: ${error.message}]`
                      );
                      console.log({ success: false });
                    }
                  }}
                >
                  Sell
                </button>
              </div>
            }
          />
          <Tab
            id="6"
            title="Redeem Tokens (buy) from Plutus Script"
            panel={
              <div style={{ marginLeft: "20px" }}>
                <p style={{ paddingTop: "20px" }}>
                  <span style={{ fontWeight: "bold" }}>Token: </span>
                  {`${fromHex(this.state.tokenForSale)}`}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Price: </span>
                  {`${100000000}`}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Contract: </span>
                  {`${Contracts["v1"].address}`}
                </p>

                <button
                  className="purple_button"
                  style={{ padding: "10px" }}
                  onClick={async () => {
                    console.log("press");
                    const wallet = {
                      data: { address: this.state.changeAddress },
                    };
                    const submittedBy = this.state.sellerAddress?.to_bech32();
                    console.log("line 866",submittedBy)
                    const artistAddress =
                      this.state.royaltiesAddress?.to_bech32();
                    const asset = {
                      status: {
                        datum: this.state.saleDetails,
                        datumHash: this.state.datumHash,
                        submittedBy,
                        artistAddress,
                      },
                      details: { asset: this.state.asset },
                    };

                    try {
                      // console.log(wallet);
                      // console.log(asset);
                      await Wallet.getAvailableWallets();
                      const walletUtxos = await Wallet.getUtxos();
                      console.log("utxo");
                      const contractVersion = "v1"; //resolveContractVersion(asset);
                      // console.log(walletUtxos);
                      const assetUtxo = (
                        await getLockedUtxosByAsset(
                          contractAddress(contractVersion).to_bech32(),
                          asset.details.asset
                        )
                      ).find(
                        (utxo) => utxo.data_hash === asset.status.datumHash
                      );
                      // console.log("assetUtxo", assetUtxo);
                      console.log("asset", asset);
                      console.log("assetutxo",assetUtxo)
                      if (assetUtxo) {
                        console.log("iffff");
                        console.log("assetdatum",asset.status.datum);

                        const txHash = await purchaseAsset(
                          asset.status.datum,
                    
                          {
                            address: fromBech32(wallet.data.address),
                            utxos: walletUtxos,
                          },
                          {
                            seller: fromBech32(asset.status.submittedBy),
                            artist: fromBech32(asset.status.artistAddress),
                            market: fromBech32(marketFeeAddress),
                          },
                          await createTxUnspentOutput(
                            contractAddress(contractVersion),
                            assetUtxo
                          ),
                          contractVersion
                        );
                            console.log("txhash",txHash);
                        if (txHash) {
                          const event = createEvent(
                            MARKET_TYPE.PURCHASE,
                            asset.status.datum,
                            txHash,
                            wallet.data.address
                          );

                          console.log({
                            success: true,
                            type: MARKET_TYPE.PURCHASE,
                            txHash,
                          });
                        } else {
                          console.log({ success: false });
                        }
                      } else {
                        console.log({ success: false });
                      }
                    } catch (error) {
                      console.error(
                        `Unexpected error in purchaseToken. [Message: ${error.message}]`
                      );
                      console.log({ success: false });
                    }
                  }}
                >
                  Buy
                </button>
              </div>
            }
          />
          <Tabs.Expander />
        </Tabs>

        <hr style={{ marginTop: "40px", marginBottom: "40px" }} />

        <p>{`Submitted Tx Hash: ${this.state.submittedTxHash}`}</p>
        <p>{this.state.submittedTxHash ? "check your wallet !" : ""}</p>
      </div>
    );
  }
}
