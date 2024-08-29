import { Box, Flex, Image, Text } from '@chakra-ui/react'
import authImg from '../../assets/pexels-podnar2018-1424239.jpg'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Divider } from '@mantine/core'



function AboutAuthor({name, desc, socials}: {name: string, desc: string, socials: string}) {
  return (
    <>
      <Box w={'100%'} display={'flex'} flexDir={'column'} gap={'30px'}>
        <Box display={'flex'} alignItems={'center'} flexDir={'column'} gap={'15px'}>
            <Text fontWeight={'600'} lineHeight={'1'}>About Me</Text>
            <Box w={'100%'} display={'flex'} flexDir={'column'} alignItems={'center'}>
                <Image src={authImg} w={'100%'} />
                <Text fontWeight={'600'} fontSize={'17px'}> {name} </Text>
            </Box>
            <Box w={'90%'} display={'flex'} flexDir={'column'} gap={'14px'}>
                <Text textAlign={'center'} fontSize={'16px'} fontWeight={400}>New York based interior designer & Lifestyle Guide Editor. Stunning interiors, décor finds, and styling ideas.  So glad you stopped by!
                  {desc}
                </Text>
                <Link to={'#comment'} style={{width: 'fit-content', borderBottom: '2px solid black', paddingBottom: '2px'}}>Read more</Link>
            </Box>
        </Box>
        <Box display={'flex'} flexDir={'column'} gap={'10px'} alignItems={'center'}>
            <Box>
                <Text textTransform={'capitalize'} fontWeight={'600'}>
                Subscribe & Follow
                </Text>
            </Box>
            <Box>
                <Flex alignItems={'center'} justifyContent={'center'} w={'100%'} gap={'13px'}>
                    <Link to={socials}>
                    <FaXTwitter/>
                    {/* <FontAwesomeIcon icon={FaXTwitter} /> */}
                    </Link>
                    <Link to={socials}>
                    <FaInstagram/>
                    {/* <FontAwesomeIcon icon={FaInstagram} /> */}
                    </Link>
                    <Link to={socials}>
                        <FaFacebook/>
                    </Link>
                </Flex>
            </Box>
        </Box>
      </Box>
      <Divider/>
    </>
  )
}

export default AboutAuthor
