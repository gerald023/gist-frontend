import { Text } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router'

function Auth() {
  return (
    <>
     <Text fontSize={'30px'} fontWeight={'800'}>Welcome</Text>
      <Outlet/>
    </>
  )
}

export default Auth
