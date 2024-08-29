import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import comImg from '../../assets/ads.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function CommentBox() {
  return (
    <>
       <Box w={'100%'}>
              <Box w={'100%'} display={'flex'} gap={'3%'}>
                <Box w={'80%'} display={'flex'} >
                  <Box>
                    <Avatar src={comImg} w={'100px'} h={'100px'} name='Gerald Lekara' />
                  </Box>
                  <Box display={'flex'} flexDir={'column'} gap={'10px'}>
                    <Box>
                      <Text fontWeight={'600'}>cmsmasters</Text>
                      <Text fontWeight={'500'} fontSize={'15px'} color={'GrayText'}>January 29, 2016
                      </Text>
                    </Box>
                    <Box>
                      <Text color={'gray'} fontWeight={300}>
                      Donec venenatis feugiat congue. Integer ipsum tellus, accumsan ut purus vitae, congue rhoncus ipsum. Praesent finibus suscipit fringilla. Curabitur faucibus libero non est viverra lacinia.
                      </Text>
                    </Box>
                    <Flex gap={'14px'}>
                        <Button>
                        <Flex alignItems={'center'} gap={'4px'}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        2K
                        </Flex>
                        </Button>
                        <Button>
                        <Flex alignItems={'center'} gap={'4px'}>
                        <FontAwesomeIcon icon={faThumbsDown} />
                        10
                        </Flex>
                        </Button>
                    </Flex>
                  </Box>
                </Box>
                <Box>
                  <Button>Reply</Button>
                </Box>
              </Box>
            </Box>
    </>
  )
}

export default CommentBox
