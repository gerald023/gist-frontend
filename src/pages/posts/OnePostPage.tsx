import { Box, Flex, Button, Image, Text } from '@chakra-ui/react'
import  { useEffect, useState } from 'react'
import { PostServices } from '../../services/PostService.service'
import { useParams } from 'react-router'
// import { Image } from '@mantine/core';
import Loader from '../../components/Loader';
import RelatedPost from './RelatedPost';
import {  Divider } from '@mantine/core';
import { formatDate } from '../../script/date.format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import CommentBox from '../../components/post/CommentBox';
import AboutAuthor from '../../components/post/AboutAuthor';
import PopularPost from '../../components/post/PopularPost';
import { useWebSocket } from '../../utils/useWebSocket ';

function OnePostPage() {
    const {id}  = useParams<{id: string}>();
    const [onePost, setPost] = useState<any>({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const postId = Number(id)
    const [likes, setLikes] = useState<Number>()
    const [dislikes, setDislikes] = useState<Number>()
    const socket = useWebSocket('ws://localhost:8080'); 
    const postService = new PostServices()
    
    const getPost = async ()=>{
        try{
            const response = await postService.getPostById(postId);
            console.log(response?.data);
            console.log(onePost);
            console.log(onePost.id);
            setPost(response?.data)

        }catch(error){
            console.log(error);
            setError(error);
        }finally{
          setLoading(false);
        }
    }
    const getLikesDislikes = async()=>{
      const allLikes = await postService.getLikesForEachPost(postId)
      setLikes(allLikes?.data.likes)
      const allDislikes = await postService.getDisikesForEachPost(postId)
      
      setDislikes(allDislikes?.data.dislikes)

      console.log(likes)
      // console.log(allLikes?.data)
      console.log(dislikes)
      // console.log(allDislikes)
    }
    useEffect(()=>{
      if (!socket) return;

       // Send initial request for likes and dislikes
    //    socket.onopen = () => {
    //     socket.send(JSON.stringify({ type: 'GET_LIKES_DISLIKES', postId }));
    // };
     // Listen for updates from the WebSocket server
  //    socket.onmessage = (event) => {
  //     console.log(event.data)
  //     const data = JSON.parse(event.data);
  //     if (data.type === 'UPDATE_LIKES_DISLIKES' && data.postId === postId) {
  //         setLikes(data.likes);
  //         setDislikes(data.dislikes);
  //         console.log('Likes updated:', data.likes);
  //         console.log('Dislikes updated:', data.dislikes);
  //     }
  // };
   // Handle socket close or error
  //  socket.onclose = () => console.log('WebSocket closed');
  //  socket.onerror = (error) => console.log('WebSocket error', error);

  //  return () => {
  //      socket.close();
  //  };
      getLikesDislikes()
      const intervalId = setInterval(getLikesDislikes, 1000);
      return () => clearInterval(intervalId);
    }, [ socket, onePost])
    useEffect(()=>{
        getPost()
        
    }, [id])
   


const likePost = async (id: string)=>{
  try{
    // const payload = new LikePostDTO(onePost.id)
    // const likePayload : LikePostDTO = {
    //   postId: id
    // }
    console.log(id)
    const response = await postService.likePost(parseInt(id, 10));
    console.log(id)
    console.log(response);
    // console.log(likePayload)
  }catch(error){
    console.log(error)
  }
}
if (loading) return <Box w={'100%'} h={'90vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
  <Loader/>
</Box>
if (error) return <Box w={'100%'} h={'90vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
<Loader/>
</Box>
if (!onePost) return <Box w={'100%'} h={'90vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
<Loader/>
</Box>
  return (
    <>
      <Box className=' w-full flex justify-center mt-24'>
      <Box w={'87%'} className=' flex  flex-col gap-8' >
      <Text fontSize={'70px'} color={''} fontWeight={'700'} textAlign={'center'} >GistBlog</Text>
      <Box className='w-full flex gap-5' gap={'20px'}>
        
          <Box className='w-3/4 gap-8 flex flex-col p-12 '>
          <Box className='w-full flex flex-col gap-1 justify-center items-center '>
        
        <Divider label={onePost.category.Catename} labelPosition='center' my={'xs'} variant='dashed' color='red' size={'lg'} />
        <Box className='flex flex-col items-center'>
          <h1 className='text-4xl text-3xl font-extrabold'>
            {onePost.title}
          </h1>
          <Text color={'GrayText'} fontSize={'15px'}> {formatDate(onePost.createdAt)} </Text>
        </Box>
        <Image src={onePost.images[0]} className='w-32' w={'100%'} />
        
      </Box>
            <Box padding={'30px'} bg={'#f2f2f2'} dangerouslySetInnerHTML={{__html: onePost.content}}/>
            <Box className='w-full flex gap-5'>
             
              <Flex gap={'16px'} justifyContent={'center'} w={'100%'}>
                <Button className='flex' onClick={()=> likePost(onePost.id)} bg={'#f9d2d0'} color={'crimson'} gap={'6px'}> 
                  <FontAwesomeIcon icon={faHeart} />
                  {likes?.toPrecision()} 
                </Button>
                <Button className='flex' bg={'#deeaf6'} onClick={getLikesDislikes} color={'#228be6'} gap={'6px'}> 
                  <FontAwesomeIcon icon={faMessage} />
                  50 
                </Button>
                <Button className='flex' gap={'6px'}> 
                  <FontAwesomeIcon icon={faEye} />
                  5000 
                </Button>
              </Flex>
            </Box>
            <RelatedPost id={onePost.cateID}/>
            <Box>
            <Divider my={'lg'} color='gray' size={'sm'} label={<Text color={'black'} fontWeight={'600'} fontSize={'13px'}>Comments</Text>} labelPosition='center' />
            </Box>
          <Box id='comment' display={'flex'} flexDir={'column'} gap={'20px'}>
            <CommentBox/>
            <CommentBox/>
            <CommentBox/>
          </Box>
          </Box>
          
          <Box  className='w-1/4 '>
            <Box w={'100%'} display={'flex'} flexDir={'column'} gap={'50px'}>
              <AboutAuthor socials='https://google.com' name={onePost.author.firstName + ' ' + onePost.author.lastName} desc={' ' + onePost.author.firstName} />
              <PopularPost/>
            </Box>
          </Box>
        </Box>
      </Box>
      </Box>
    </>
  )
}

export default OnePostPage