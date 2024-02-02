import { Button, Flex, Box } from "@chakra-ui/react";
import Logo from "./Logo";
import Nav from "./Nav";
// import { ConnectKitButton } from "connectkit";
import {
  ConnectButton,
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { CustomConnectButton } from "./CustomConnectButton";
interface HeaderProps {
  bg?: string;
}
export default function HeaderNav<HeaderProps>({ bg = "appGreen" }) {
  return (
    <Flex
      borderBottom={"1px"}
      borderBottomColor={"appBlack.900"}
      bg={bg}
      className=""
      px={8}
      py={4}
      align={"center"}
      justify={"space-between"}
    >
      <Logo />
      <Box display={{ base: "none", lg: "block", md: "block" }}>
        <Nav />
      </Box>
      <Flex>
        <CustomConnectButton />
        {/* <ConnectButton /> */}
      </Flex>
    </Flex>
  );
}
