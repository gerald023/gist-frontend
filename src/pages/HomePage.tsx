import { Box, Text } from '@chakra-ui/react'
import HomeBanner from '../components/banner/HomeBanner'

function HomePage() {
  return (
    <>
        <Box w={'100%'} display={'flex'} justifyContent={'center'}>
        <Box  w={'1400px'} display={'flex'} flexDir={'column'} color={'red'}>
        <HomeBanner/>
        </Box>
        </Box>
    </>
  )
}

export default HomePage