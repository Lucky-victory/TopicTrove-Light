import HeaderNav from "@/components/HeaderNav";
import {
  Avatar,
  Box,
  Center,
  Container,
  Divider,
  Image,
  Flex,
  Heading,
  Icon,
  PinInput,
  PinInputField,
  Square,
  Text,
  Wrap,
  WrapItem,
  Stack,
  HStack,
  Button,
  Link,
} from "@chakra-ui/react";

import React from "react";
import { format } from "date-fns";
import MarkdownRenderer from "@/components/MarkDownRenderer";
import MatIcon from "@/components/MatIcon";
import {
  FacebookIcon,
  LinkedINIcon,
  TwitterIcon,
  miniTwitterIcon,
} from "@/components/SocialIcon";
const post = {
  title: "The Astonishing Origins of 6 Common Compound Words",
  intro:
    "The 1989 Mill Valley Film Festival, in association with the Hanson Gallery in neighboring Sausalito, installed an exhibition of my portraits, including movie directors, actors, and writers. I was billed as a “Featured Artist”",
  content:
    "A week or so earlier, I was in the gallery with the staff, putting our heads together about how to hang the installation, when it dawned on us that I’d never photographed either Woods or Richardson. Unfortunately, they weren’t available to sit for portraits before the festival kicked off. But it might seem downright negligent to gallery visitors, we thought, that I’d never photographed one of the most illustrious cinemagicians of them all, a practically home-grown hero who lived and worked not so far, far away: George Lucas. Skywalker Ranch, the Lucasfilm production facility, was a short drive from the gallery",
  readTime: 5,
  coverImage:
    "https://images.unsplash.com/photo-1682685797660-3d847763208e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  createdAt: new Date(),
  author: {
    isVerified: true,
    avatar:
      "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fullName: "Mark Andre",
    shortBio: "Hey there, I’m mark, ex-techinal writer at Meta",
  },
};

const Post = () => {
  const CircleIcon = (props: any) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
  return (
    <>
      <HeaderNav bg="transparent" />
      <Box as="main">
        <Box maxW={"1350px"} marginX={"auto"} px={{ lg: 6, base: 4 }}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={4}
            mb={2}
            pt={8}
            pb={8}
            maxW={"1050px"}
            // h={345}
            alignItems={"flex-start"}
            mt={"45px"}
            mx={"auto"}
            // ml={"170px"}
          >
            <Heading
              fontSize={{ base: "4xl", lg: "40px" }}
              fontWeight={700}
              lineHeight={"normal"}
              maxW={"1000px"}
            >
              {post.title}
            </Heading>

            <Box
              fontWeight={400}
              fontSize={18}
              lineHeight={"140%"}
              maxW={"900px"}
              fontStyle={"normal"}
              color="#636566"
            >
              {post.intro}
            </Box>
          </Box>

          <HStack
            maxW={"1100px"}
            mx={"auto"}
            borderY={"1px"}
            borderColor={"blackTrans-15"}
            wrap={"wrap"}
            my={2}
            mb={6}
            py={2}
            alignItems={"flex-start"}
            gap={"20px"}
            alignSelf={"stretch"}
            justifyContent={"space-between"}
          >
            <Flex m={1} gap={5} wrap={"wrap"}>
              <Avatar
                size="lg"
                name={post.author.fullName}
                src={post.author.avatar}
              />
              <Stack
                // display={"flex"}
                // flexDirection={"column"}
                gap={"7px"}
                wrap={"wrap"}
              >
                <HStack>
                  <Text
                    fontWeight={500}
                    lineHeight={"normal"}
                    fontSize={"20px"}
                  >
                    {post.author.fullName}
                  </Text>
                  {post.author.isVerified && (
                    <MatIcon name="verified" bold filled color="blue" />
                  )}
                  <Button
                    fontWeight={500}
                    fontSize={"14px"}
                    gap={"6px"}
                    h={"27px"}
                    // variant={"outline"}
                    size={"sm"}
                    rounded={"full"}
                  >
                    <MatIcon name="add" size={24} bold /> Follow
                  </Button>
                </HStack>

                <HStack gap={2}>
                  <Text
                    as={"span"}
                    color="#636566"
                    fontWeight={400}
                    lineHeight={"normal"}
                    fontSize={"16px"}
                  >
                    {post.readTime} min read{" "}
                  </Text>
                  <CircleIcon color={"#636566"} boxSize={1.5} />{" "}
                  <Text as={"span"}>
                    {format(post.createdAt, "MMM dd yyyy")}
                  </Text>
                </HStack>
              </Stack>
            </Flex>

            <Box
              display={"flex"}
              flexDirection={"column"}
              p={"4px 0px"}
              alignItems={"flex-start"}
              gap={"6px"}
            >
              <Text fontSize={"large"} fontWeight={500}>
                Share this post on
              </Text>
              <Flex gap={"9px"}>
                <Link>{LinkedINIcon}</Link>
                <Link>{FacebookIcon}</Link>
                <Link>{TwitterIcon}</Link>
              </Flex>
            </Box>
          </HStack>

          {/* <Divider orientation="horizontal" /> */}
        </Box>

        <Box>
          <Image
            src={post.coverImage}
            alt=""
            maxH={"640px"}
            minH="300px"
            className="w-full"
            objectFit={"cover"}
          />
        </Box>

        <Box
          as="section"
          maxW="1100px"
          mx="auto"
          my={6}
          px={{ lg: 6, base: 4 }}
        >
          <MarkdownRenderer markdown={post.content} />
        </Box>

        {/* <Box
          maxW={"1100px"}
          mx={"auto"}
          //   px={6}
          //   pt={6}
          //   mt={20}
          //   pb={24}
          bg={"blackTrans-2"}
        >
          <Box
            display={"inline-flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={"10px"}
            padding={"2px 79px 35px 0px"}
          >
            <Avatar
              flexShrink={0}
              size="lg"
              name={post.author.name}
              src={post.author.avatar}
            />

            <Text color={"black"} fontSize={24} fontWeight={600}>
              Written By {post.author.name}
            </Text>
            <Text color={"#636566"} fontWeight={400} fontSize={16}>
              {post.author.shortBio}
            </Text>
          </Box>
        </Box> */}

        <Box
          maxW={"1100px"}
          px={{ lg: 6, base: 4 }}
          mx={"auto"}
          //   px={6}
          mt={10}
          py={6}
          //   bg={"blackTrans-2"}
        >
          <Box
            borderY={"1px"}
            borderColor={"blackTrans-15"}
            gap={"10px"}
            py={5}
          >
            <Text color={"black"} fontSize={24} fontWeight={600}>
              Written By
            </Text>

            <HStack
              mt={2}
              py={2}
              justify={"space-between"}
              gap={"20px"}
              wrap={"wrap"}
            >
              <Flex m={1} gap={5} wrap={"wrap"}>
                <Avatar
                  size="lg"
                  name={post.author.fullName}
                  src={post.author.avatar}
                />
                <Stack gap={"7px"}>
                  <HStack>
                    <Text
                      fontWeight={500}
                      lineHeight={"normal"}
                      fontSize={"20px"}
                    >
                      {post.author.fullName}
                    </Text>
                    {post.author.isVerified && (
                      <MatIcon name="verified" bold filled color="blue" />
                    )}
                    <Button
                      fontWeight={500}
                      fontSize={"14px"}
                      h={"27px"}
                      size={"sm"}
                      // variant={"outline"}
                      gap={"6px"}
                      rounded={"full"}
                    >
                      <MatIcon name="add" size={24} bold /> Follow
                    </Button>
                  </HStack>

                  <HStack gap={2}>
                    <Text
                      as={"span"}
                      color="#636566"
                      fontWeight={400}
                      lineHeight={"normal"}
                      fontSize={"16px"}
                    >
                      {post.author.shortBio}
                    </Text>
                  </HStack>
                  <Flex gap={"9px"}>
                    <Link>{LinkedINIcon}</Link>
                    <Link>{FacebookIcon}</Link>
                    <Link>{TwitterIcon}</Link>
                  </Flex>
                </Stack>
              </Flex>

              <Stack gap={"16px"}>
                <Text fontSize={"large"} fontWeight={600}>
                  Say thanks to this author
                </Text>

                <HStack>
                  <Button
                    w={"auto"}
                    fontWeight={500}
                    h={"31px"}
                    gap={"6px"}
                    rounded={"full"}
                  >
                    Tip a token
                  </Button>
                  <Button
                    w={"auto"}
                    fontWeight={500}
                    h={"31px"}
                    variant={"outline"}
                    gap={"6px"}
                    rounded={"full"}
                  >
                    Share on {miniTwitterIcon}
                  </Button>
                </HStack>
              </Stack>
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Post;
