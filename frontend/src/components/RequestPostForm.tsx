import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function RequestPostForm({showAuthor=true,onClose=()=>{}}){
    const [isSubmitting,setIsSubmitting]=useState(false);
    const toast=useToast({
        status:'success',title:'Request submitted successfully',duration:2500,position:'top'
    })
function handleSubmit(){
setIsSubmitting(true)

setTimeout(()=>{
    setIsSubmitting(false)
    toast()
onClose()
},3000)
}
    return <Box>
        <Stack py={8} gap={4} as={'form'}>
            <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <FormHelperText>What would you like to title the post?</FormHelperText>
                <Input placeholder="My first post title" fontWeight={'medium'} fontSize={'20px'} name="title"/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <FormHelperText>Give details of what you want this post to cover.</FormHelperText>
                <Textarea placeholder="Details about this post..." minH={'120px'} maxH={'200px'} name="description"/>
            </FormControl>

            <Button type="submit" onClick={handleSubmit} isLoading={isSubmitting}  rounded={'full'}>Submit Request</Button>
        </Stack>
    </Box>
}

export function RequestPostFormWithModal({isOpen=false,onClose=()=>{},onOpen=()=>{}}){
return <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size={'xl'}>
    <ModalOverlay/>
    <ModalContent>
          <ModalHeader>Request a post</ModalHeader>
          <ModalCloseButton />
<ModalBody>
        <RequestPostForm onClose={onClose}/>
</ModalBody>
    </ModalContent>
</Modal>
}