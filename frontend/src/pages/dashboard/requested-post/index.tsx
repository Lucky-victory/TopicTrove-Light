
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../layout'
import { Box, Button, Flex, HStack, Text, useDisclosure } from '@chakra-ui/react'
import { RequestPostFormWithModal } from '@/components/RequestPostForm'

const allPostRequests = [ 
  {
    id: "1",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    request: "I want you to write about me because i love games and i can dance",
    stake: 5,
    recievedTips: 10,
    status: 'pending',

  },

  {
    id: "2",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    request: "I want you to write about me because i love games and i can dance",
    stake: 5,
    recievedTips: 10,
    status: 'accepted',

  },
  {
    id: "3",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    request: "I want you to write about me because i love games and i can dance",
    stake: 5,
    recievedTips: 10,
    status: 'completed',

  },
 
]
const allUsersRequests = [ 
  {
    id: "1",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    request: "I want you to write about me because i love games and i can dance",
    stake: 5,
    recievedTips: 10,
    status: 'pending',

  },

  {
    id: "2",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    request: "I want you to write about me because i love games and i can dance",
    stake: 5,
    recievedTips: 10,
    status: 'declined',

  },
  {
    id: "2",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    request: "I want you to write about me because i love games and i can dance",
    stake: 5,
    recievedTips: 10,
    status: 'completed',

  },
]


const RequestedPost = () => {
const {isOpen,onClose,onOpen}=useDisclosure()
  const [usersRequests, setUsersRequests] = useState(allUsersRequests);
  const [postRequests, setPostsRequets] = useState(allPostRequests)

  const getUsersRequests = () => {

    setUsersRequests([...allUsersRequests])

  }

  const getPostRequests = () => {

    setPostsRequets([...allPostRequests])

  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'black';
      case 'declined':
        return 'red';
      case 'completed':
        return 'green';
      default:
        return 'black';
    }
  }

//  useEffect(()=> {
//   getPostRequests();
//   getUsersRequests();

//  })


  return (
   <DashboardLayout>
    <RequestPostFormWithModal onClose={onClose} onOpen={onOpen} isOpen={isOpen}/>
<Box bg={'blackTrans-5'} minH={'300px'} flex={1}>

<Flex h={1062}  p={'20px 0px'} flexDirection={'column'} alignItems={'flex-start'} gap={'12px'} flexShrink={0} alignSelf={'stretch'}>

  
<Flex p={'12px 20px 12px 16px'} justifyContent={'space-between'} alignItems={'flex-start'} alignSelf={'stretch'} background={'white'}>
  <Text fontSize={'32px'} fontWeight={600}>Requested Posts</Text>

  <Button display={'flex'} p={'8px 20px'} alignItems={'center'} onClick={onOpen} gap={10} borderRadius={999} >
    <HStack  pr={4} gap={4}>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5.96717 23.3333C5.43051 23.3333 4.98251 23.1537 4.62317 22.7943C4.26306 22.4342 4.08301 21.9858 4.08301 21.4492V6.55083C4.08301 6.01417 4.26306 5.56617 4.62317 5.20683C4.98251 4.84672 5.43051 4.66667 5.96717 4.66667H16.8265V5.83333H5.96717C5.78829 5.83333 5.62379 5.908 5.47367 6.05733C5.32434 6.20744 5.24967 6.37194 5.24967 6.55083V21.4492C5.24967 21.6281 5.32434 21.7926 5.47367 21.9427C5.62379 22.092 5.78829 22.1667 5.96717 22.1667H20.8655C21.0444 22.1667 21.2089 22.092 21.359 21.9427C21.5083 21.7926 21.583 21.6281 21.583 21.4492V10.5898H22.7497V21.4492C22.7497 21.9858 22.57 22.4338 22.2107 22.7932C21.8506 23.1533 21.4022 23.3333 20.8655 23.3333H5.96717ZM9.33301 19.25V18.0833H17.4997V19.25H9.33301ZM9.33301 15.75V14.5833H17.4997V15.75H9.33301ZM9.33301 12.25V11.0833H17.4997V12.25H9.33301ZM20.4163 9.33333V7H18.083V5.83333H20.4163V3.5H21.583V5.83333H23.9163V7H21.583V9.33333H20.4163Z" fill="white"/>
      </svg>
      <Text fontSize={'16px'} fontWeight={600}>Request Post</Text>

    </HStack>
  </Button>
</Flex>

{/* **********************Requested By You Section ************************ */}

<Flex p={'12px 20px 12px 16px'} justifyContent={'space-between'} alignItems={'flex-start'} alignSelf={'stretch'} background={'white'}>
  <Text fontSize={'18px'} fontWeight={500}>Requested by you</Text>

  <Button display={'flex'} background={'white'} p={'2px 20px'} alignItems={'center'} gap={10} borderRadius={999} border={'1px solid black'}>
   
     
      <Text fontSize={'14px'} color={'black'} fontWeight={500}>view all</Text>

  </Button>
</Flex>

<Flex p={'19px 10px'} alignItems={'flex-start'} alignContent={'flex-start'} gap={4} alignSelf={'stretch'} flexWrap={'wrap'}>

{usersRequests.map((userReq: any) => (
  
  <>
  <Box display={'flex'} w={'340px'} p={'12px 0px'} flexDirection={'column'} alignItems={'flex-start'} gap={10} borderRadius={'10px'} border={'1px solid rgba(0, 0, 0, 0.05)'} background={'white'}>
    <Flex p={'0px 10px'} alignItems={'center'} alignSelf={'stretch'} justifyContent={'space-between'} borderBottom={'1px solid rgba(0, 0, 0, 0.05) '}>
      <Text> {userReq.createdAt}</Text>
      <Button background={'white'} >  
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M13.9997 21.6277C13.6785 21.6277 13.4039 21.5137 13.176 21.2858C12.9481 21.0579 12.8338 20.783 12.833 20.461C12.833 20.1406 12.9473 19.866 13.176 19.6373C13.4047 19.4087 13.6792 19.2943 13.9997 19.2943C14.3209 19.2943 14.5955 19.4087 14.8233 19.6373C15.0512 19.866 15.1656 20.1406 15.1663 20.461C15.1663 20.7822 15.052 21.0572 14.8233 21.2858C14.5947 21.5145 14.3201 21.6284 13.9997 21.6277ZM13.9997 15.1667C13.6785 15.1667 13.4039 15.0523 13.176 14.8237C12.9481 14.595 12.8338 14.3204 12.833 14C12.833 13.6788 12.9473 13.4042 13.176 13.1763C13.4047 12.9484 13.6792 12.8341 13.9997 12.8333C14.3209 12.8333 14.5955 12.9477 14.8233 13.1763C15.0512 13.405 15.1656 13.6796 15.1663 14C15.1663 14.3212 15.052 14.5958 14.8233 14.8237C14.5947 15.0516 14.3201 15.1659 13.9997 15.1667ZM13.9997 8.70567C13.6785 8.70567 13.4039 8.59133 13.176 8.36267C12.9481 8.134 12.8338 7.85944 12.833 7.539C12.833 7.21778 12.9473 6.94283 13.176 6.71417C13.4047 6.4855 13.6792 6.37156 13.9997 6.37233C14.3209 6.37233 14.5955 6.48628 14.8233 6.71417C15.0512 6.94206 15.1656 7.217 15.1663 7.539C15.1663 7.85944 15.052 8.134 14.8233 8.36267C14.5947 8.59133 14.3201 8.70567 13.9997 8.70567Z" fill="#525559"/>
      </svg>
      </Button>
    </Flex>

    <Flex p={'6px 10px 8px 10px'} flexDirection={'column'} alignItems={'flex-start'} gap={10} alignSelf={'stretch'}>
      <Text fontSize={'15px'} fontWeight={600}> {userReq.postTitle}</Text>
      <Text fontSize={'13px'} fontWeight={300}>{userReq.request}</Text>
    </Flex>

    <Flex p={'6px 10px 0px 10px'} alignItems={'center'} alignContent={'center'} gap={10} alignSelf={'stretch'} flexWrap={'wrap'} borderTop={'1px solid rgba(0, 0, 0, 0.05)'}>
      <HStack>
      <Box display={'flex'} p={'4px 0px'} alignItems={'flex-start'} gap={6} >
        <Text fontSize={'14px'} color={'#636566'} fontWeight={400}>
          Stake:
        </Text>
        <Text  fontSize={'14px'} color={'black'} fontWeight={500}> {userReq.stake} ETH 
        </Text>
        
      </Box>

      <Box display={'flex'} p={'4px 0px 4px 10px'} alignItems={'flex-start'} gap={6}  borderLeft={'1px solid rgba(0, 0, 0, 0.05) '}>
        <Text  fontSize={'14px'} color={'#636566'} fontWeight={400}>
          Recieved Tips: 
        </Text>
        <Text  fontSize={'14px'} color={'black'} fontWeight={500}>
          {userReq.recievedTips} ETH 
        </Text>
      </Box>

      </HStack>
     

    </Flex>
</Box>

  </>
))}




</Flex>

{/* **********************Requested For You Section ************************ */}

<Flex p={'12px 20px 12px 16px'} justifyContent={'space-between'} alignItems={'flex-start'} alignSelf={'stretch'} background={'white'}>
  <Text fontSize={'18px'} fontWeight={500}>Requested for you</Text>

  <Button display={'flex'} background={'white'} p={'2px 20px'} alignItems={'center'} gap={10} borderRadius={999} border={'1px solid black'}>
   
     
      <Text fontSize={'14px'} color={'black'} fontWeight={500}>view all</Text>

  </Button>
</Flex>

<Flex p={'19px 12px'} alignItems={'flex-start'} alignContent={'flex-start'} gap={4} alignSelf={'stretch'} flexWrap={'wrap'} >

{postRequests.map((request: any)=> (
  <>


<Box display={'flex'} w={'340px'} p={'12px 0px'} flexDirection={'column'} alignItems={'flex-start'} gap={10} borderRadius={'10px'} border={'1px solid rgba(0, 0, 0, 0.05)'} background={'white'}>
    <Flex p={'0px 10px'} alignItems={'center'} alignSelf={'stretch'} justifyContent={'space-between'} borderBottom={'1px solid rgba(0, 0, 0, 0.05) '}>
      <Text>{request.createdAt}</Text>

      
        <Text fontSize={'14px'} color={'#636566'} fontWeight={400}>
          Status:
        </Text>
        <Text  fontSize={'14px'} color={getStatusColor(request.status)} fontWeight={500}>
          {request.status}
        </Text>
        
      

      <Button background={'white'}  >  
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M13.9997 21.6277C13.6785 21.6277 13.4039 21.5137 13.176 21.2858C12.9481 21.0579 12.8338 20.783 12.833 20.461C12.833 20.1406 12.9473 19.866 13.176 19.6373C13.4047 19.4087 13.6792 19.2943 13.9997 19.2943C14.3209 19.2943 14.5955 19.4087 14.8233 19.6373C15.0512 19.866 15.1656 20.1406 15.1663 20.461C15.1663 20.7822 15.052 21.0572 14.8233 21.2858C14.5947 21.5145 14.3201 21.6284 13.9997 21.6277ZM13.9997 15.1667C13.6785 15.1667 13.4039 15.0523 13.176 14.8237C12.9481 14.595 12.8338 14.3204 12.833 14C12.833 13.6788 12.9473 13.4042 13.176 13.1763C13.4047 12.9484 13.6792 12.8341 13.9997 12.8333C14.3209 12.8333 14.5955 12.9477 14.8233 13.1763C15.0512 13.405 15.1656 13.6796 15.1663 14C15.1663 14.3212 15.052 14.5958 14.8233 14.8237C14.5947 15.0516 14.3201 15.1659 13.9997 15.1667ZM13.9997 8.70567C13.6785 8.70567 13.4039 8.59133 13.176 8.36267C12.9481 8.134 12.8338 7.85944 12.833 7.539C12.833 7.21778 12.9473 6.94283 13.176 6.71417C13.4047 6.4855 13.6792 6.37156 13.9997 6.37233C14.3209 6.37233 14.5955 6.48628 14.8233 6.71417C15.0512 6.94206 15.1656 7.217 15.1663 7.539C15.1663 7.85944 15.052 8.134 14.8233 8.36267C14.5947 8.59133 14.3201 8.70567 13.9997 8.70567Z" fill="#525559"/>
      </svg>
      </Button>
    </Flex>

    <Flex p={'6px 10px 8px 10px'} flexDirection={'column'} alignItems={'flex-start'} gap={10} alignSelf={'stretch'}>
      <Text fontSize={'15px'} fontWeight={600}> {request.title}</Text>
      <Text fontSize={'13px'} fontWeight={300}>{request.request}</Text>
    </Flex>

    <Flex p={'6px 10px 0px 10px'} alignItems={'center'} alignContent={'center'} gap={10} alignSelf={'stretch'} flexWrap={'wrap'} borderTop={'1px solid rgba(0, 0, 0, 0.05)'}>
      <HStack>
      <Box display={'flex'} p={'4px 0px'} alignItems={'flex-start'} gap={6} >
        <Text fontSize={'14px'} color={'#636566'} fontWeight={400}>
          Stake:
        </Text>
        <Text  fontSize={'14px'} color={'black'} fontWeight={500}>{request.stake} ETH 
        </Text>
        
      </Box>

      <Box display={'flex'} p={'4px 0px 4px 10px'} alignItems={'flex-start'} gap={6}  borderLeft={'1px solid rgba(0, 0, 0, 0.05) '}>
        <Text  fontSize={'14px'} color={'#636566'} fontWeight={400}>
          Recieved Tips: 
        </Text>
        <Text  fontSize={'14px'} color={'black'} fontWeight={500}>
          0.5 ETH 
        </Text>
      </Box>

      </HStack>
     

    </Flex>
</Box>


</>


  
 
))}
</Flex>






</Flex>

</Box>
   </DashboardLayout>
  )
}

export default RequestedPost