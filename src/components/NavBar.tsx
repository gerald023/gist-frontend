import { Box, Button, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import  { useEffect, useState } from 'react'
import '../styles/navBar.css'
import { Link } from 'react-router-dom';

function NavBar() {

    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState<number>(780);

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
          setIsVisible(false); 
        } else {
          setIsVisible(true); 
        }
        setLastScrollY(window.scrollY);
      };
    useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);


  return (
    <>
        <Box as='nav' w={'100%'} zIndex={'999'} className={`nav ${isVisible ? 'visible' : 'hidden'}`} display={'flex'}  bg={''} justifyContent={'center'} padding={'0 5%'}>
            <Box className='navContainer' w={'100%'} color={'#003366'} padding={'20px 20px'} display={'flex'} bg={''} justifyContent={'space-between'} alignItems={'center'}>
                <Box display={'flex'} className='logo' alignItems={'center'} gap={'12px'}>
                    <Text fontSize={'23px'} fontWeight={'700'}>LOGO</Text>
                </Box>
                <UnorderedList listStyleType={'none'} display={'flex'} gap={'30px'} fontWeight={'600'}>
                    <ListItem>News</ListItem>
                    <ListItem>Trending </ListItem>
                    <ListItem>Entertainment</ListItem>
                    <ListItem>Life</ListItem>
                    <ListItem>Gist us</ListItem>
                </UnorderedList>
                <Box className='auth' display={'flex'} gap={'20px'}>
                    <Box>
                        <Link to={'auth'}>
                        <Button padding={'0 30px'} bg={'transparent'} border={'2px solid #003366'} color={'#003366'}>Sign up</Button>
                        </Link>
                    </Box>
                    <Box>
                        <Link to={'auth/login'}>
                        <Button padding={'0 30px'} bg={'#003366'} border={'2px solid transparent'} color={'#F2F2F2'} _hover={{}}>Login</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default NavBar