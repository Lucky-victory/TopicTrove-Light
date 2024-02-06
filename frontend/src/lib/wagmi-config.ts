import { CHAIN_NAMESPACES, OPENLOGIN_NETWORK } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { configureChains } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Chain } from "@wagmi/core";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";


export const pegasus = {
  id: 1891,
  name: "Pegasus Testnet",
  network: "pegasus",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://replicator.pegasus.lightlink.io/rpc/v1"] },
    default: { http: ["https://replicator.pegasus.lightlink.io/rpc/v1"] },
  },
  blockExplorers: {
    etherscan: { name: "expolorer", url: "https://pegasus.lightlink.io/" },
    default: { name: "expolorer", url: "https://pegasus.lightlink.io/" },
  },

} as const satisfies Chain;


export const { chains, publicClient } = configureChains(
  [pegasus],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://replicator.pegasus.lightlink.io/rpc/v1`,
      }),
    }),
    //publicProvider()
  ],
);
export const chainConfig = () => ({
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x" + chains[0].id.toString(16),
  rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
  displayName: chains[0].name,
  tickerName: chains[0].nativeCurrency?.name,
  ticker: chains[0].nativeCurrency?.symbol,
  blockExplorer: chains[0].blockExplorers?.default.url[0],
});

export const web3AuthInstance = new Web3Auth({
  clientId:
    "BO5agSMb5sACnG5fWFOtBtIz_C9lCb0UPm-Qin-Na5AdaRgnQYoACgsfqqP4tpiw916Bnvn7jkJL3Gjhr8GYRiI",
  chainConfig: chainConfig(),
  // uiConfig refers to the whitelabeling options, which is available only on Growth Plan and above
  // Please remove this parameter if you're on the Base Plan
  uiConfig: {
    appName: "W3A",
    // appLogo: "https://web3auth.io/images/web3auth-logo.svg", // Your App Logo Here
    theme: {
      primary: "blue",
    },
    mode: "dark",
    logoLight: "https://web3auth.io/images/web3auth-logo.svg",
    logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
    defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
    loginGridCol: 3,
    primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
    modalZIndex: "2147483647",
  },
  web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_MAINNET,
});


