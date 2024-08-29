import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import '../styles/loader.style.css'

function Loader() {
  return (
    <>
     <Box display={'flex'} gap={'14px'}>
     <Box className='loader'>

</Box>
<Text className='loadingTxt'></Text>
     </Box>

    </>
  )
}

export default Loader
