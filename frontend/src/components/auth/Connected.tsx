import { web3AuthInstance } from "@/lib/wagmi-config";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Connected() {
  const [isConnected, setIsConnected] = useState(web3AuthInstance.connected);
  console.log({ user: web3AuthInstance?.getUserInfo() });
  const getUser = async () => {};

  web3AuthInstance.addListener("connected", () => {
    console.log("listener");
  });
  web3AuthInstance.addListener("logout", () => {
    console.log("logout out");
  });
  useEffect(() => {
    getUser();
    setIsConnected(web3AuthInstance.connected);
  }, []);
  return <Box>{isConnected ? "connected" : "please login"}</Box>;
}
