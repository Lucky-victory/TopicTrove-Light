import { Link } from "@chakra-ui/next-js";
import { Box, Flex } from "@chakra-ui/react";

export default function Nav(){
return <Flex gap={7} py={3} px={'25px'} as="nav" border={'1px'} borderColor={'appBlack.900'} rounded={'full'}> 
<Link fontWeight={'semibold'} fontSize={'18px'}  href={'/'}>Home</Link>
<Link fontWeight={'semibold'} fontSize={'18px'}  href={'/creators'}>Creators</Link>
<Link fontWeight={'semibold'} fontSize={'18px'}  href={'/how-it-works'}>How it works</Link>
<Link fontWeight={'semibold'} fontSize={'18px'}  href={'/about'}>About Us</Link>
</Flex>
}
