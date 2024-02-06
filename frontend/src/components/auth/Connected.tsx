import { web3AuthInstance } from "@/lib/wagmi-config";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Connected() {
  const [isConnected, setIsConnected] = useState();
  //console.log({ user: web3AuthInstance.getUserInfo() });

  return <Box>{web3AuthInstance.connected ? "connected" : "please login"}</Box>;
}
