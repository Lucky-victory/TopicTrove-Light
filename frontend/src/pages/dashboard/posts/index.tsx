import React, { useState } from "react";
import DashboardLayout from "../layout";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import MatIcon from "@/components/MatIcon";
import { Link } from "@chakra-ui/next-js";

import PostTable from "@/components/PostTable";

const Posts = () => {
  return (
    <DashboardLayout>
      <Box px={4}>
        <Box
          rounded={"12px"}
          // maxW={"calc(1350px - var(--dash-sidebar-w))"}
          my={5}
          bg={"white"}
          py={6}
        >
          <HStack
            px={4}
            py={3}
            mb={4}
            justify={"space-between"}
            borderBottom={"1px"}
            borderBottomColor={"blackTrans-15"}
          >
            <Heading size={"lg"}>Posts</Heading>
            <Button
              rounded={"full"}
              as={Link}
              href={"posts/new"}
              textDecor={"none!important"}
            >
              <MatIcon name="post_add" /> Create Post
            </Button>
          </HStack>

          <PostTable />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Posts;
