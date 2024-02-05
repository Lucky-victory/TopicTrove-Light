import { Avatar, Button, Flex, HStack } from "@chakra-ui/react";
import MatIcon from "./MatIcon";

export default function DashboardHeader() {
  return (
    <Flex
      pr={4}
      bg={"white"}
      justify={"flex-end"}
      py={3}
      borderBottom={"1px"}
      borderBottomColor={"blackTrans-15"}
    >
      <HStack gap={4}>
        <Button
          size={"sm"}
          color="red.500"
          borderColor={"currentColor"}
          variant="outline"
          gap={3}
          rounded={"full"}
        >
          <MatIcon name="logout" /> Logout
        </Button>
        <Avatar
          size={"sm"}
          src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </HStack>
    </Flex>
  );
}
