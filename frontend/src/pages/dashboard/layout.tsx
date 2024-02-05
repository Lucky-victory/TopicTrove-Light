import DashboardHeader from "@/components/DashboardHeader";
import DashboardSideBar from "@/components/DashboardSidebar";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Flex h={"100dvh"} minH={"700px"} maxH={"830px"}>
      <DashboardSideBar />
      <Flex
        bg={"appBlack.50"}
        ml={"var(--dash-sidebar-w)"}
        // flex={1}
        // justify={"unset"}
        // align={"unset"}
        direction={"column"}
        w="full"
        gap={0}
        h={"full"}
        maxW={"calc((100% - 32px) - var(--dash-sidebar-w))"}
      >
        <DashboardHeader />
        {children}
      </Flex>
    </Flex>
  );
}
