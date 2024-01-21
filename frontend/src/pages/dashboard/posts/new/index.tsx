import { Box, Button, Flex, HStack, Input, Stack, Textarea, useToast } from "@chakra-ui/react";
import DashboardLayout from "../../layout";
import { ChangeEvent, useState } from "react";
import ReactMde from 'react-mde';

import "react-mde/lib/styles/css/react-mde-all.css";
import MarkdownRenderer from "@/components/MarkDownRenderer";
import DragAndDropImage from "@/components/DragAndDropImage";
import { putJSONandGetHash } from "@/lib/ipfs-utils";
import { slugify } from "@/lib/utils";
import axios from 'axios'

type POST_STATUS='DRAFT'|'PUBLISHED'
export default function NewPostPage(){
const toast=useToast({
  duration:3000,position:'top',status:'success',title:' Successful'
})
  const [imageFile,setImageFile]=useState<Blob>()
  const [submitting,setSubmitting]=useState<boolean>(false)
    const [contentValue, setContentValue] = useState("**Hello world!!!**");
    const [post,setPost]=useState({
      title:'',slug:'',content:'',intro:'',coverImage:'',status:'DRAFT',userId:1
    })

  const [selectedTab, setSelectedTab] =useState<"write" | "preview">("write");
function onImageChangeHandler(hasImage:boolean,files:File[],image:string){
  if(hasImage){

    setImageFile(files[0]);
    const reader = new FileReader();
      
    reader.onload = function (e) {
      const base64String = e.target?.result as string;
      console.log({base64String})
      setPost((prev)=>({...prev,coverImage:base64String}))
    };
    reader.readAsBinaryString(files[0])
  }
}
async function saveAsDraft(){
  setSubmitting(true)
  try {
    const postToSave={...post,slug:slugify(post.title)};
    // if(imageFile){
    //   // const reader = new FileReader();
      
    //   // reader.onload = function (e) {
    //   //   const base64String = e.target?.result as string;
    //   //   postToSave.coverImage=base64String
    //   // };
    //   // reader.readAsDataURL(imageFile);
    //   console.log({postToSave});
      
    // }
    const res=  await axios.post('/api/posts/new',postToSave)
    toast({title:res.data?.message});

    setTimeout(()=>{

      setSubmitting(false)
    },1500)

  } catch (error) {
    toast({title:'An error occured, please try again',status:'error'})
    setSubmitting(false)
  }
}
async function saveAsPublished(){
try {
  setSubmitting(true)

  const postToSave={...post,status:'PUBLISHED',slug:slugify(post.title)};
    // if(imageFile){
    //   const reader = new FileReader();
      
    //   reader.onload = function (e) {
    //     const base64String = e.target?.result as string;
    //     postToSave.coverImage=base64String
    //   };

    //   reader.readAsDataURL(imageFile);
    // }
    const res=  await axios.post('/api/posts/new',postToSave)
    toast({title:res.data?.message});

    setTimeout(()=>{

      setSubmitting(false)
    },1500)
      
} catch (error) {
  
  toast({title:'An error occured, please try again',status:'error'})
  setSubmitting(false)
}
}
  function handleEditorChange(value: string): void {
    setContentValue(value);
    setPost((prev)=>({...prev,content:value}))
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void {
    const {name,value}=event.target;
    setPost((prev)=>({...prev,[name]:value}))
    
    
  }

return <DashboardLayout>
      <Flex pos={'sticky'} top={0} zIndex={10} bg={'white'} justifyContent={'flex-end'} py={2} my={4} px={4} borderBottom={'1px'} borderColor={'blackTrans-15'}> <HStack gap={4}><Button isLoading={submitting} onClick={saveAsPublished} rounded={'full'} px={6}>Publish </Button> <Button isLoading={submitting} onClick={saveAsDraft} rounded={'full'} variant={'outline'}>Save as draft</Button></HStack></Flex>
    <Stack px={4} py={6} gap={3}>

  <DragAndDropImage onUploadChange={(hasImage,files,image)=>onImageChangeHandler(hasImage,files,image)}/>
  
  <Input name="title" value={post.title} onChange={handleInputChange} h={'auto'}  py={2} placeholder="Post Title..." fontSize={'x-large'} fontWeight={'medium'}/>
  <Textarea  name="intro" value={post.intro} onChange={handleInputChange} my={4} maxH={'200px'} placeholder="A short introduction for the post..."></Textarea>
    <Box py={4}>
      <ReactMde
        value={contentValue}
        onChange={(value:string)=>handleEditorChange(value)}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(<MarkdownRenderer markdown={markdown}  />)
        }
      />
    </Box>
    <Box>
      </Box>
    </Stack>
</DashboardLayout>
}