import { CHAIN_NAMESPACES, OPENLOGIN_NETWORK } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { configureChains } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [publicProvider()],
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
    "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ",
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
