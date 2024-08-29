import { Avatar, Box, Flex, Img, Text } from '@chakra-ui/react'
import blog from '../../assets/blogCode.jpg';
import '../../styles/banner.css';
import authorImg from '../../assets/travel.jpg'
import { blogSchema } from '../../schemas/blogSchema.schema';
import { string } from 'zod';
import { Link } from 'react-router-dom';


function BlogBox(props: blogSchema)   {
    const shorten =(textCon: string) : string=>{
        // const text: any = document.getElementById('name');
        // let textCon: any = text?.textContent;
        const maxLength = 35;
        textCon = textCon?.length > maxLength ? textCon?.slice(0, maxLength) + "..." : textCon;
        console.log(textCon);
        return textCon;
    }
    
  return (
    <>
      <Link to={`/post/${props.id}`}>
      <Box className='blogBox'>
              <Box className='img'>
                <Box className='tag'>{props.category}</Box>
                <Img  className={'blogImg'} src={props.Post_images}/>
              </Box>
              <Box className='desc'>
                <Box className='name'>
                  <Text id='name'>{shorten(props.title)}</Text>
                </Box>
                <Box className='author'>
                  <Box className='authorImg'>
                    <Avatar objectFit={'contain'} name={props.author} className='autImg'  src={props.author_image}/>
                  </Box>

                  <Box className='authorName'>
                    <Text color={'black'} fontWeight={'600'}>{props.author}</Text>
                    <Flex justifyContent={'space-between'} color={'gray'} gap={'4px'}>
                      <Text>{props.createAt}</Text>
                      <Text>-</Text>
                      {/* <Text>5m Read</Text> */}
                    </Flex>
                  </Box>
                </Box>
              </Box>
      </Box>
      </Link>
    </>
  )
}

export default BlogBox
