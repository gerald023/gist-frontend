import { Box, Text } from "@chakra-ui/react"
import { Image } from "@mantine/core";
import { PostServices } from "../../services/PostService.service";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import '../../styles/relatedPost.css'


function RelatedPost({id}: {id: number}) {
    const postService = new PostServices();
    const [post, setPost] = useState([])
    const getPostByCategory = async ()=>{
        try{
            const response = await postService.getPostByCategory(id)
            console.log(response)
            setPost(response?.data)

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getPostByCategory()
    }, [])
  return (
    <>
     <Box display={'flex'} flexDir={'column'} gap={'14px'} >
        <Box w={'100%'} padding={'10px'} borderBottom={'2px solid gray'}>
            <Text fontSize={'23px'} fontWeight={'600'}>Related Post</Text>
        </Box>
     <Box className="grid gap-6 w-full bg-yellow-400" gridTemplateColumns={'repeat(auto-fit, minMax(200px, 300px))'} w={'100%'} display={'grid'} gap={'20px'} justifyContent={'center'}>
       {
        post ? 
       post.map((onePost: any) =>{
        return(
           <Link  style={{width: '100%'}} to={`/post/${onePost.id}`}>
                 <Box w={'100%'} display={'flex'} flexDir={'column'} gap={'10px'} h={'fit-content'}   >
            <Image className="relatePost" src={onePost.images[0]} />
            <Text fontSize={'19px'} fontWeight={'600'} paddingX={'7px'}>
                {onePost.title}
            </Text>
        </Box>
        
           </Link>
        )
       })
    : 
    <Box w={'100%'} h={'fit-content'} ><Loader/></Box>
       }
       
      </Box>
     </Box>
    </>
  )
}

export default RelatedPost
