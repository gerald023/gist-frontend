import { Box, Flex, Text } from '@chakra-ui/react'
import imgs from '../../assets/blogCode.jpg'
import Slider from "react-slick";
import investment from '../../assets/pexels-podnar2018-1424239.jpg';
import groupImg from '../../assets/ads.jpg';
import bet from '../../assets/travel.jpg'
import { Image } from '@mantine/core';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';


function PopularPost() {
    const settings = {
        dots: true,
        fade: false,
        infinite: true,
        className: "passwordSlide",
        adaptiveHeight: true,
        speed: 500,
        autoplay: true,
        swipeToSlide: true,
        slidesToShow: 1,
        autoplaySpeed: 5000,
        draggable: true,    
        cssEase: "linear",
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: true,
        // afterChange: function(index: number) {
        //     console.log(
        //       `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        //     );
        //   }
      };
  return (
    <>
      <Box w={'100%'} display={'flex'} flexDir={'column'} gap={'40px'}>
        <Text textAlign={'center'} fontWeight={'600'} textTransform={'capitalize'}>Popular Post</Text>
       <Box width={'100%'} display={'flex'} gap={'20px'} flexDir={'column'}>
       {
        [1,2,3].map((data: any)=>{
            return(
                <Box key={data} w={'90%'} display={'flex'} gap={'4%'}>
                <Box w={'25%'} >
                    <img style={{width: '100%', height:'fit-content', aspectRatio: '2/2', scale: '2', overflow: 'hidden'}} src={imgs} />
                </Box>
                <Box w={'70%'}>
                    <Flex w={'100%'} flexDir={'column'} gap={''}>
                        <Text fontWeight={'600'} fontSize={'16px'}>
                        How to Shop Like a Fashion Editor
                        </Text>
                        <Text color={'GrayText'} fontSize={'14px'} fontWeight={500}>
                        September 28, 2017
                        </Text>
                    </Flex>
                </Box>
            </Box>
            )
        })
       }

      
       </Box>
       <div className="slider-container  flex flex-col justify-center  w-full h-full">
        <Text textAlign={'center'} fontWeight={'600'}>Our Projects</Text>
      <Slider {...settings} className='h-full '>
        <div className='w-full p-4 h-screen  '>
          <Box className='w-full h-full flex text-gray-50 flex-col gap-6 items-center overflow-hidden  '>
           
            <Box>
                
            </Box>
            <Box className='w-full  '>
                <Image className='h-96 filter drop-shadow-2xl calImg w-1/2 mx-auto object-top' src={groupImg}/>
            </Box>
            <Box >
                <Text className='font-bold text-base '>A brighter tomorrow starts with wise savings today.</Text>
            </Box>
          </Box>
        </div>
        <div className='w-full p-4 h-screen '>
        <Box className='w-full h-full flex text-gray-50 flex-col gap-6 items-center overflow-hidden  '>
            <Box>
               
            </Box>
            <Box className='w-full  '>
                <Image className='h-96 w-1/2 mx-auto calImg object-top' src={investment}/>
            </Box>
            <Box >
                <Text className='font-bold text-base '>Save today, prosper tomorrow!!</Text>
            </Box>
          </Box>
        </div>
        <div className='w-full p-4 h-screen '>
        <Box className='w-full h-full flex text-gray-50 flex-col gap-6 items-center overflow-hidden  '>
            <Box>
               
            </Box>
            <Box className='w-full  '>
                <Image className='h-96 w-1/2 mx-auto calImg object-top' src={bet}/>
            </Box>
            <Box >
                <Text className='font-bold text-base '>Bet with confidence, celebrate with joy.</Text>
            </Box>
          </Box>
        </div>
       
      </Slider>
    </div>
      </Box>

    </>
  )
}

export default PopularPost
