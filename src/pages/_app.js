import { useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import Store from "/src/redux/store/index.js";
import "/src/assets/css/app.scss";
import theme from "/src/assets/theme/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import Router from "./router.js";
import { AuthProvider } from "./authContext";

import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "/src/utils/connectors";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { MeshProvider } from "@meshsdk/react";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ChatProvider from "../components/chat/ChatProvider";

require("@solana/wallet-adapter-react-ui/styles.css");

const store = Store();

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const [isMounted, setIsMounted] = useState(false);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <MeshProvider>
                <ThemeProvider theme={theme}>
                  <ChatProvider>
                    <AuthProvider>
                      <Router />
                    </AuthProvider>
                  </ChatProvider>
                </ThemeProvider>
              </MeshProvider>
            </WalletProvider>
          </ConnectionProvider>
        </Web3ReactProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
