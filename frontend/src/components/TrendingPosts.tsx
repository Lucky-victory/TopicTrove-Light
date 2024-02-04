import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import MatIcon from "./MatIcon";
import { format } from "date-fns";
export default function TrendingPosts() {
  const trendingPosts = [
    {
      title: "The Astonishing Origins of 6 Common Compound Words",
      content: "",
      intro: "",
      author: {
        username: "mark-andre43",
        fullName: "Mark Andre",
        avatar:
          "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      createdAt: new Date().getTime(),
      id: 1,
      slug: "understanding-human-psychology",
      coverImage:
        "https://images.unsplash.com/photo-1683009427513-28e163402d16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      readTime: 4,
    },
    {
      title: "The Astonishing Origins of 6 Common Compound Words",
      content: "",
      intro: "",
      author: {
        username: "mark-andre43",
        fullName: "Mark Andre",
        avatar:
          "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      createdAt: new Date().getTime(),
      id: 1,
      slug: "understanding-human-psychology",
      coverImage:
        "https://images.unsplash.com/photo-1683009427513-28e163402d16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      readTime: 4,
    },
    {
      title: "The Astonishing Origins of 6 Common Compound Words",
      content: "",
      intro: "",
      author: {
        username: "mark-andre43",
        fullName: "Mark Andre",
        avatar:
          "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      createdAt: new Date().getTime(),
      id: 1,
      slug: "understanding-human-psychology",
      coverImage:
        "https://images.unsplash.com/photo-1683009427513-28e163402d16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      readTime: 4,
    },
    {
      title: "The Astonishing Origins of 6 Common Compound Words",
      content: "",
      intro: "",
      author: {
        username: "mark-andre43",
        fullName: "Mark Andre",
        avatar:
          "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      createdAt: new Date().getTime(),
      id: 1,
      slug: "understanding-human-psychology",
      coverImage:
        "https://images.unsplash.com/photo-1683009427513-28e163402d16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      readTime: 4,
    },
  ];
  return (
    <Box py={5} mx={"auto"}>
      <Box px={"10px"}>
        <Flex p={"10px"} gap={"10px"} align={"center"}>
          <MatIcon name="chart_data" size={34} />
          <Heading size={"md"} fontWeight={"medium"}>
            Trending on TopicTrove
          </Heading>
        </Flex>
      </Box>
      <Box maxW={"1320px"} mx={"auto"}>
        <HStack
          wrap={"wrap"}
          py={3}
          px={3}
          rowGap={4}
          columnGap={5}
          maxWidth={"auto"}
        >
          {trendingPosts.map((post) => (
            <HStack
              key={post.slug}
              align={"start"}
              gap={"18px"}
              p={4}
              maxW={"610px"}
              minW={"300px"}
              bg={"blackTrans-2"}
              borderRadius={"6px"}
            >
              <Image
                alt=""
                h={"130px"}
                src={post?.coverImage}
                w={"140px"}
                borderRadius={"8px"}
              />
              <Stack gap={"10px"}>
                <HStack gap={"10px"}>
                  <Avatar src={post?.author?.avatar} size={"sm"} />{" "}
                  <Text fontWeight={"medium"} fontSize={"14px"} as={"span"}>
                    {post?.author?.fullName}
                  </Text>
                </HStack>
                <Heading
                  fontWeight={"semibold"}
                  fontSize={"17px"}
                  lineHeight={"26px"}
                >
                  <Link href={`${post.author.username}/${post.slug}`}>
                    {post?.title}
                  </Link>
                </Heading>

                <HStack>
                  <Text
                    fontSize={"14px"}
                    lineHeight={"21px"}
                    as={"span"}
                    color={"appBlack.500"}
                  >
                    {format(post?.createdAt, "MMM dd")}
                  </Text>
                  <Box
                    w={"5px"}
                    h={"5px"}
                    rounded={"full"}
                    bg={"appBlack.500"}
                  ></Box>
                  <Text
                    fontSize={"14px"}
                    lineHeight={"21px"}
                    as={"span"}
                    color={"appBlack.500"}
                  >
                    {post?.readTime} min read
                  </Text>
                </HStack>
              </Stack>
            </HStack>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
