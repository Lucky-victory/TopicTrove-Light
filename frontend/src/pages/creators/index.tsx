import HeaderNav from "@/components/HeaderNav";
import { RequestPostFormWithModal } from "@/components/RequestPostForm";
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
  Input,
  Stack,
  VStack,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";

const creators = [
  {
    avatar: "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Mark Andre",
    shortBio: "Hey there, I’m mark, ex-techinal writer at Meta",
    genre: ["AI", "Machine Learning"],
  },
  {
    avatar: "https://plus.unsplash.com/premium_photo-1675129779582-d84b954f2397?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alex John",
    shortBio: "Decentralization Enthusiast, I write about Solana, Ethers, Bitcoin",
    genre: ["Web3", "Ethereum"],
  },
  {
    avatar: "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Pluto Boy",
    shortBio: "I'm a Novel writer",
    genre: ["Fiction", "Nature",'Skiing'],
  },
  {
    avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Chika Ojo",
    shortBio: "I love Technology, and this where I share my learnings",
    genre: ["Gadgets", "Smart Home","Smart Cars"],
  },
];

const Creators = () => {
  const {isOpen,onClose,onOpen}=useDisclosure()
  return (
    <div>
      <RequestPostFormWithModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
      <Box maxW={"1350px"} marginX={"auto"}>
        <HeaderNav />

        <Box
          // className="creator-intro"
          bg={"appGreen"}
          borderBottom={'1px'}
          borderBottomColor={'appBlack.900'}
          py={'60px'}
        >
          <Box maxW={"744px"} pl={{lg:8,base:4}} >
            <Heading color={"black"} fontSize={{lg:'60px',base:'40px',md:'50px'}} fontWeight={800}>
              Find the best Creators
            </Heading>
            <Text
              fontSize={{lg:20,base:'18px'}}
              fontWeight={400}
              lineHeight={"normal"}
              mt={4}
              maxW={"25rem"}
              pr={5}
            >
              {" "}
              Request quality content from top creators on TopicTrove
            </Text>
          </Box>
        </Box>

        {/* ***SEARCH SECTION**** */}

        <Flex
          mt={30}
        justify={'center'}
          py={"0px"} 
          
          mx={'auto'}
          maxW={"1300px"}
          
        
        >
          <Flex gap={5} wrap={'wrap'}  mx={'auto'}
       maxW={'1250px'} w={'full'} 
       
            p={"16px 24px"}
           justify={{lg:'center',base:'flex-start'}}
          >
          
            <Input
              display={"flex"}
              placeholder="Search Creator"
              maxW={"739px"}
              h={"48px"}
              w={'full'} flex={1}
              p={"17px 24px"}
            minW={'330px'}
              gap={"16px"}
              rounded={"full"}
              border={"1px solid #A2A4A5"}
            />
            <Button size={'lg'} rounded={'full'} px={6}>Search</Button>
          </Flex>

        </Flex>

        {/* ***TOP_CREATORS SECTION**** */}
        <Box
          display={"flex"}
          w={"1300px"}
          p={"10px 1123px 10px 13px"}
          alignItems={"center"}
          borderBottom={"1px solid rgba(0, 0, 0, 0.05)"}
        >
          <Text fontWeight={600} fontSize={24}>
            Top Creators
          </Text>
        </Box>

        <Box
          display={"flex"}
          maxW={"1300px"}
          p={"20px 11px"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          alignContent={"flex-start"}
          gap={"15px"}
          alignSelf={"stretch"}
          flexWrap={"wrap"}
        >
          {creators.map((creator,i) => (
            <>
              <Flex
                key={'creator'+i}
              
                maxW={"629px"}
                w={'full'}
                p={"14px 16px"}
              
                gap={"16px"}
                flexWrap={"wrap"}
                borderRadius={10}
                border={"1px solid rgba(0, 0, 0, 0.15)"}
              >
                <Flex gap={'16px'} align={'flex-start'} flexWrap={'wrap'}>
                  <Avatar
                    name="TopicTrove Creator"
                    src={creator.avatar}
                    borderRadius={12}
                    w={{lg:100,base:'full',md:'100px'}}
                    h={{lg:120,base:'250px',md:'120px'}}
                    flexShrink={0}
                  />

                  <Box w={323}  flexShrink={0}>
                    <Stack gap={'10px'}>
                      <Flex align={'center'}
                        fontSize={20} gap={5}
                        fontWeight={600}
                      
                        lineHeight={"normal"}
                      >
                        {" "}
                        {creator.name}
                        <Box
                          display={"inline-flex"}
                        
                          p={"3px 10px"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          gap={"10px"}
                          borderRadius={999}
                          background={"appGreen"}
                        >
                          <Text as={'span'}
                            fontSize={12}
                            fontWeight={500}
                            lineHeight={"normal"}
                          >
                            PPP: $25
                          </Text>
                        </Box>
                      </Flex>
                    <Text
                      fontSize={15}
                      fontWeight={400}
                    
                      lineHeight={"normal"}
                      color={"#636566"}
                    >
                      {" "}
                      {creator.shortBio}
                    </Text>
                    <Box
                      display={"flex"}
                      w={300}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"flex-start"}
                    >
                      <Text
                        fontWeight={500}
                        
                        fontSize={16}
                        lineHeight={"normal"}
                      >
                        Writes about:{" "}
                      </Text>
                      <HStack wrap={'wrap'}
              
                        
                        p={"8px 0px"}
                      
                        gap={"10px"}
                      
                      >
                        {creator.genre.map((item,i) => (
                          <>
                            <Box
                              key={'genre'+i}
                              display={"flex"}
                              p={"4px 14px"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              gap={"10px"}
                              borderRadius={999}
                              background={"rgba(0, 0, 0, 0.05)"}
                            >
                              <Text
                                fontSize={14}
                                fontWeight={500}
                                lineHeight={"normal"}
                              >
                                {item}
                              </Text>
                            </Box>
                          </>
                        ))}
                      </HStack>
                    </Box>
                  </Stack>
                  </Box>

                  <Stack  gap={4} direction={{md:'column',base:'row', lg:'column'}}>
               
                    <Button
                      display={"flex"}
                      // w={138}
                      // minW={120}
                      p={"6px 16px"}
                     
                      gap={10}
                      rounded={'full'} onClick={onOpen}
                      background={"black"}
                    >
                      <Text
                        color={"white"}
                        fontSize={14}
                        fontWeight={500}
                        lineHeight={"normal"}
                      >
                        Request a post
                      </Text>
                    </Button>
                    <Button
                      display={"flex"}
                      // w={138}
                      // minW={120}
                      p={"6px 16px"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    rounded={'full'}
                    variant={'outline'}
                    >
                      <Text
                        color={"black"}
                        fontSize={14}
                        fontWeight={500}
                        lineHeight={"normal"}
                      >
                        View Profile
                      </Text>
                    </Button>
                
                    
                  </Stack>
                 
                </Flex>
              </Flex>
            </>
          ))}
        </Box>

        {/* ***MORE_CREATORS SECTION**** */}
        <Box
          display={"flex"}
          py={"10px"}
          px={'3'}
          alignItems={"center"}
          borderBottom={"1px solid rgba(0, 0, 0, 0.05)"}
        >
          <Text fontWeight={600} w={"17rem"} fontSize={24}>
            More Creators
          </Text>
        </Box>

        <Box
          display={"flex"}
          maxW={"1300px"}
          p={"20px 11px"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          alignContent={"flex-start"}
          gap={"15px"}
          alignSelf={"stretch"}
          flexWrap={"wrap"}
        >
          {creators.map((creator,i) => (
            <>
            <Flex
              key={'creator'+i}
            
              maxW={"629px"}
              w={'full'}
              p={"14px 16px"}
            
              gap={"16px"}
              flexWrap={"wrap"}
              borderRadius={10}
              border={"1px solid rgba(0, 0, 0, 0.15)"}
            >
              <Flex gap={'16px'} align={'flex-start'} flexWrap={'wrap'}>
                <Avatar
                  name="TopicTrove Creator"
                  src={creator.avatar}
                  borderRadius={12}
                  w={{lg:100,base:'full',md:'100px'}}
                  h={{lg:120,base:'250px',md:'120px'}}
                  flexShrink={0}
                />

                <Box w={323}  flexShrink={0}>
                  <Stack gap={'10px'}>
                    <Flex align={'center'}
                      fontSize={20} gap={5}
                      fontWeight={600}
                    
                      lineHeight={"normal"}
                    >
                      {" "}
                      {creator.name}
                      <Box
                        display={"inline-flex"}
                      
                        p={"3px 10px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={"10px"}
                        borderRadius={999}
                        background={"appGreen"}
                      >
                        <Text as={'span'}
                          fontSize={12}
                          fontWeight={500}
                          lineHeight={"normal"}
                        >
                          PPP: $25
                        </Text>
                      </Box>
                    </Flex>
                  <Text
                    fontSize={15}
                    fontWeight={400}
                  
                    lineHeight={"normal"}
                    color={"#636566"}
                  >
                    {" "}
                    {creator.shortBio}
                  </Text>
                  <Box
                    display={"flex"}
                    w={300}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                  >
                    <Text
                      fontWeight={500}
                      
                      fontSize={16}
                      lineHeight={"normal"}
                    >
                      Writes about:{" "}
                    </Text>
                    <HStack wrap={'wrap'}
                      
                      
                      p={"8px 0px"}
                    
                      gap={"10px"}
                    
                    >
                      {creator.genre.map((item,i) => (
                        <>
                          <Box
                            key={'genre'+i}
                            display={"flex"}
                            p={"4px 14px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={"10px"}
                            borderRadius={999}
                            background={"rgba(0, 0, 0, 0.05)"}
                          >
                            <Text
                              fontSize={14}
                              fontWeight={500}
                              lineHeight={"normal"}
                            >
                              {item}
                            </Text>
                          </Box>
                        </>
                      ))}
                    </HStack>
                  </Box>
                </Stack>
                </Box>

                <Stack  gap={4} direction={{md:'column',base:'row', lg:'column'}}>
             
                  <Button
                    display={"flex"}
                    // w={138}
                    // minW={120}
                    p={"6px 16px"}
                   
                    gap={10}
                    rounded={'full'}
                    background={"black"}
                  >
                    <Text
                      color={"white"}
                      fontSize={14}
                      fontWeight={500}
                      lineHeight={"normal"}
                    >
                      Request a post
                    </Text>
                  </Button>
                  <Button
                    display={"flex"}
                    // w={138}
                    // minW={120}
                    p={"6px 16px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  rounded={'full'}
                  variant={'outline'}
                  >
                    <Text
                      color={"black"}
                      fontSize={14}
                      fontWeight={500}
                      lineHeight={"normal"}
                    >
                      View Profile
                    </Text>
                  </Button>
              
                  
                </Stack>
               
              </Flex>
            </Flex>
          </>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Creators;