import { Link } from "@chakra-ui/next-js";
import { Box, Button, Flex, HStack, Image, List, ListItem, Stack, Text } from "@chakra-ui/react";
import MatIcon from "./MatIcon";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { FC } from "react";



interface SidebarProps{
    entryPath?:string
}
export default function DashboardSideBar({entryPath='/dashboard/'}:SidebarProps ){
  const links=[{
    title:'Overview',url:'overview',icon:'dashboard'
},{title:'Posts',url:'posts',icon:'box'},{
    title:'Requested Post',url:'requested-post',icon:'post'
},{
    title:'Settings',url:'settings',icon:'settings'
},];
const pathname = usePathname();
// console.log({pathname,entry:entryPath});

const parts = pathname.split('/');
const lastPart = parts[parts.length - 1];
const _links = links.map((link, i) => {
  const isActive =
    lastPart === link?.url ||
    (link?.url === 'overview' && lastPart === 'dashboard');
  
  const buildLink = (entry: string, url: string) => url.toLowerCase() === 'overview' ? entry + '' : entry + url;

  return (
    <HStack as={ListItem}
      key={'navlink' + i}
      px={5}
      
      >
      <HStack as={Link} flex={1} 
        fontSize={'18px'}
      py={'10px'}
      px={3}
      color={'appBlack.300'}
      borderRadius={'8px'} fontWeight={400}
      bg={'transparent'}
      _hover={{ bg:'whiteAlpha.900',color:'appBlack.900'}}
      {...(isActive && { bg:'white',color:'appBlack.900',fontWeight:'semibold',_hover:{bg:'whiteAlpha.900'} })}
        textDecor={'none!important'}
        href={buildLink(entryPath as string, link?.url)}
    
        gap={'18px'}
      >
        <MatIcon name={link?.icon} size={28} />
        <span>{link?.title}</span>
      </HStack>
    </HStack>
  );
});
return (
    <Stack w={'260px'} h={'full'} bg={'appBlack.900'} pos={'fixed'} top={0} gap={'10px'}>
    <Link href='/' py={'10px'} px={'18px'}>
       <Image src="/assets/TopicTrove-white.svg" maxW={'150px'}/>
     
    </Link>
    <Stack as={List} py={6} px={0} gap={3}>
      {[_links]}
    </Stack>
  </Stack>
);
 
}