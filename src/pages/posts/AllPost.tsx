import { useEffect, useState } from 'react'
import { postDTO, PostServices } from '../../services/PostService.service';
import { Box } from '@chakra-ui/react';
import { Image } from '@mantine/core';

function AllPost() {
    const [Post, setPost] = useState<postDTO[]>([]);
    const postService = new PostServices();
    const viewPost = async ()=>{
        try{
            const response = await postService.getAllPost();
            setPost(response?.data);
            console.log(response);
            console.log(Post)
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        viewPost()
    }, []);
    
  return (
    <>
      <Box w={'40%'} margin={'10px auto'}>
              {
                Post && (
                  Post.map((allP)=>{
                    return(
                      <Box key={allP.id}>
                        <h1 style={{color: 'red', fontWeight: 500}}>  this is the cate: {allP.cateID}</h1>
                        {allP.title}
                        <Image src={allP.images[0]}  alt='cate image'/>
                        
                        <Box dangerouslySetInnerHTML={{__html: allP.content}}/>
                      </Box>
                    )
                  })
                )
              }
            </Box>
    </>
  )
}

export default AllPost
