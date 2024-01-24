
import React from 'react'
import DashboardLayout from '../layout'
import { Box, Button, Flex, HStack, Heading, Text , Image} from '@chakra-ui/react'
import MatIcon from '@/components/MatIcon'
import { Link } from '@chakra-ui/next-js'
import { url } from 'inspector'


const posts = [ 
  {
    id: "1",
    image: "https://bit.ly/dan-abramov",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    views: 12,
  },

  {
    id: "2",
    image: "https://bit.ly/dan-abramov",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    views: 200,
  },
  {
    id: "3",
    image: "https://bit.ly/dan-abramov",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    views: 20,
  },
  {
    id: "4",
    image: "https://bit.ly/dan-abramov",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    views: 800,
  },
  {
    id: "4",
    image: "https://bit.ly/dan-abramov",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    views: 800,
  },
  {
    id: "4",
    image: "https://bit.ly/dan-abramov",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    views: 800,
  },
  {
    id: "4",
    image: "https://bit.ly/dan-abramov",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    views: 800,
  },
  {
    id: "4",
    image: "https://bit.ly/dan-abramov",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    views: 800,
  },
  {
    id: "4",
    image: "https://bit.ly/dan-abramov",
    createdAt: "Jan 16 2024",
    postTitle: "Understanding Humans psycology, philosophy and Psiology",
    views: 800,
  },
]
const Posts = () => {
  return (
   <DashboardLayout>
    <HStack px={4} py={3} justify={'space-between'}><Heading>Posts</Heading><Button rounded={'full'} as={Link} href={'posts/new'} textDecor={'none!important'}><MatIcon name='post_add'/> Create Post</Button></HStack>
<Box bg={'blackTrans-5'} minH={'300px'} flex={1}>

  <Box display={'flex'} p={'24px 0px'} flexDirection={'column'} alignItems={'flex-start'} gap={'10px'}>
  <Box display={'flex'} p={'19px 0px'} justifyContent={'center'} flexWrap={'wrap'} alignItems={'center'} gap={5} alignSelf={'stretch'}>

{posts.map((post) => (
 <>
   <Box key={post.id} display={'flex'} ml={2} w={'320px'} pb={'16px'} flexDirection={'column'} alignItems={'flex-start'} gap={'10px'} borderRadius={'10px'} border={'1px solid rgba(0, 0, 0, 0.05)'}background={'#fff'}>
     <Box display={'flex'}   h={'176px'} p={'144px 0px 0px 205px'} justifyContent={'flex-end'} alignItems={'center'} alignSelf={'stretch'}borderBottom={'1px solid brown'} borderRadius={'10px'}  backgroundImage={post.image}>

     <Flex padding={'4px 17px '} justifyContent={'center'} alignContent={'center'} background={'white'}>
       <Text fontSize={'16px'} color={'grey'} fontWeight={500}>views: </Text>
       <Text fontSize={'16px'} ml={1} fontWeight={500} >{post.views }k</Text>
     </Flex>
     </Box>
  {/* <Image borderRadius={'10px'}  objectFit={'cover'} src={post.image} alt='Dan Abramov' /> */}
 <Flex w={'320px'} p={'1px 224px 4px 15px '} alignItems={'center'} borderBottom={'1px solid black-5'}>
   <Text fontSize={'14px'} fontWeight={400}>{post.createdAt}</Text>
 </Flex>
 <Flex h={79} p={'6px 14px'} alignItems={'flex-start'} gap={'10px'} alignSelf={'stretch'}>
 <Text fontSize={15} fontWeight={600}> {post.postTitle}</Text>
 </Flex>
 <HStack display={'flex'} p={'12px 14px'} alignItems={'center'} gap={'16px'} alignSelf={'stretch'}>
   <Button display={'flex'} p={'9px 24px'} alignItems={'flex-start'} gap={10} borderRadius={999}>
   <Text fontSize={16}  fontWeight={600}> Edit post </Text>
     </Button>
   <Button display={'flex'} p={'9px 24px'} alignItems={'flex-start'} gap={10} background={'white'} borderRadius={999} border={'1px solid black'}>
      <Text fontSize={16} color={'black'} fontWeight={600}> View post </Text>
      </Button>
 </HStack>
 </Box>
 </>
))}
</Box>

  </Box>

 





  



</Box>
   </DashboardLayout>
  )
}

export default Posts