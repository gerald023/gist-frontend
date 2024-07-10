import { Box, Img } from '@chakra-ui/react';
import sabinus from '../../assets/sabinus.jpeg';

function HomeBanner() {
  return (
    <>
      <Box display={'flex'} w={'100%'} h={'90vh'} flexDir={'column'}  marginTop={'80px'}  bg={'red'}>
        <Box w={'100%'} h={'100%'} pos={'relative'} bg={'blue'}>
          <Box position={'absolute'} right={'-3'} w={'9%'} top={'3'} display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'5px'} fontWeight={'700'} h={'40px'} bg={'#003366'} color={'#F2F2F2'}>Highlights</Box>
          <Box position={'absolute'} w={'100%'} h={'20%'} bg={'green'} bottom={'0'}></Box>
        </Box>
      </Box>
      <Box w={'100%'} h={'600px'} bg={'red'}></Box>
    </>
  )
}

export default HomeBanner;