import { Box, ChakraProvider, Text } from '@chakra-ui/react'
import HomeBanner from '../components/banner/HomeBanner'

function HomePage() {
  return (
    <>
        <ChakraProvider>
        <Box w={'100%'} display={'flex'} justifyContent={'center'}>
        <Box  w={'1400px'} display={'flex'} flexDir={'column'} color={''}>
        <HomeBanner/>
        {/* <Text contentEditable marginBottom={'50px'}>hello my guy</Text> */}
        </Box>
        </Box>
        </ChakraProvider>
    </>
  )
}

export default HomePage