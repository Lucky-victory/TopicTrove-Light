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
} from "@chakra-ui/react";

import React from "react";
import {format} from 'date-fns'
import MarkdownRenderer from "@/components/MarkDownRenderer";
const post = {
    title: "The Astonishing Origins of 6 Common Compound Words",
    intro:'The 1989 Mill Valley Film Festival, in association with the Hanson Gallery in neighboring Sausalito, installed an exhibition of my portraits, including movie directors, actors, and writers. I was billed as a “Featured Artist”',
    content:"A week or so earlier, I was in the gallery with the staff, putting our heads together about how to hang the installation, when it dawned on us that I’d never photographed either Woods or Richardson. Unfortunately, they weren’t available to sit for portraits before the festival kicked off. But it might seem downright negligent to gallery visitors, we thought, that I’d never photographed one of the most illustrious cinemagicians of them all, a practically home-grown hero who lived and worked not so far, far away: George Lucas. Skywalker Ranch, the Lucasfilm production facility, was a short drive from the gallery",
    readTime: 5,
    coverImage:'https://images.unsplash.com/photo-1682685797660-3d847763208e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    createdAt: new Date(),
    author: {
       avatar: "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Mark Andre",
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
            <Box maxW={"1350px"} marginX={"auto"}>
                <HeaderNav bg="transparent" />

                
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
                        mx={'auto'}
                        // ml={"170px"}
                    >
                        <Heading
                            fontSize={"40px"}
                            fontWeight={700}
                            lineHeight={"normal"} maxW={'1000px'}
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

                            {/* <Divider mt={5} mb={2} orientation="horizontal" /> */}
                        </Box>

                        <HStack
                        borderY={'1px'} borderColor={'blackTrans-5'}
                            display={"flex"}
                            mt={2}
                        py={2}
                            alignItems={"flex-start"}
                            gap={"20px"}
                            alignSelf={"stretch"}
                        >
                            <Avatar
                                 size="lg"
                            name={post.author.name}
                            src={post.author.avatar}
                            />
                            <Stack
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"flex-start"}
                                gap={"7px"}
                            >
                                <Text
                                    fontWeight={500}
                                    lineHeight={"normal"}
                                    fontSize={"20px"}
                                >
                                    {post.author.name}
                                </Text>
<HStack gap={2}>

                                <Text as={'span'}
                                    color="#636566"
                                    fontWeight={400}
                                    lineHeight={"normal"}
                                    fontSize={"16px"}
                                    >
                                    {post.readTime} min read{" "}

                                    </Text>
                                    <CircleIcon
                                    
                                    color={"#636566"}
                                    boxSize={1.5}
                                    />{" "}
                                    <Text as={'span'}>
                                    {format(post.createdAt,'MMM dd yyyy')}
                                </Text>
                                    </HStack>
                            </Stack>
                        </HStack>
                        {/* <Divider orientation="horizontal" /> */}
                    </Box>
            

        
                    <Box>
                        <Image
                            src={post.coverImage}
                            alt=""
                            maxH={"640px"} minH='300px'
                            className="w-full"
                            objectFit={"cover"}
                        />
                    </Box>
        

                <Box as='section'  maxW='1100px' mx='auto' my={6}>
                 
                      <MarkdownRenderer markdown={post.content}/>
                    
                </Box>

                <Box maxW={'1100px'} mx={'auto'} px={6} pt={6} mt={20}
                pb={24} bg={'blackTrans-2'}
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
                        {/* {" "} */}
                        <Text color={"black"} fontSize={24} fontWeight={600}>
                            Written By {post.author.name}
                        </Text>
                        <Text color={"#636566"} fontWeight={400} fontSize={16}>
                            {post.author.shortBio}
                            
                        </Text>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Post;
