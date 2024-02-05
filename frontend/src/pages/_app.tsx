import MainChakraProvider from "@/providers/chakra";
import "@/styles/globals.css";
import "material-symbols/outlined.css";
import type { AppProps } from "next/app";
import {
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import "@rainbow-me/rainbowkit/styles.css";
import { rainbowWeb3AuthConnector } from "../components/RainbowWeb3AuthConnector";
import { rainbowWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { chains, publicClient } from "@/lib/wagmi-config";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID as string,

    // Required
    appName: "Articulaa",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      rainbowWallet({ projectId: "04309ed1007e77d1f119b85205bb779d", chains }),
      rainbowWeb3AuthConnector({ chains }),
      metaMaskWallet({ projectId: "04309ed1007e77d1f119b85205bb779d", chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme()}
        modalSize="compact"
      >
        <MainChakraProvider>
          <Component {...pageProps} />
        </MainChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
