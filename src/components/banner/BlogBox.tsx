import { Avatar, Box, Flex, Img, Text } from '@chakra-ui/react'
import blog from '../../assets/blogCode.jpg';
import '../../styles/banner.css';


function BlogBox() {
    const shorten =()=>{
        const text: any = document.getElementById('name');
        let textCon: any = text?.textContent;
        const maxLength = 10;
        textCon = textCon?.length > maxLength ? textCon?.slice(0, maxLength) + "..." : textCon;
        console.log(textCon);
    }
    shorten()
  return (
    <>
      <Box className='blogBox'>
              <Box className='img'>
                <Box className='tag'>fashion</Box>
                <Img src={blog}/>
              </Box>
              <Box className='desc'>
                <Box className='name'>
                  <Text id='name'>3 Easy Ways To Make Div Center</Text>
                </Box>
                <Box className='author'>
                  <Box>
                    <Avatar name='Gerald' src={blog}/>
                  </Box>

                  <Box className='authorName'>
                    <Text color={'black'} fontWeight={'600'}>Gerald</Text>
                    <Flex justifyContent={'space-between'} color={'gray'} gap={'4px'}>
                      <Text>July 14, 2024</Text>
                      <Text>-</Text>
                      <Text>5m Read</Text>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
    </>
  )
}

export default BlogBox
