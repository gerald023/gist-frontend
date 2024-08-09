import { Avatar, Box, Flex, Img, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
// import sabinus from '../../assets/sabinus.jpeg';
import banner from '../../assets/pexels-podnar2018-1424239.jpg';
import '../../styles/banner.css'
import blog from '../../assets/blogCode.jpg'
import BlogBox from './BlogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowRight, faCircle, faLocationArrow, faPlus } from '@fortawesome/free-solid-svg-icons';
import travel from '../../assets/travel.jpg'

function HomeBanner() {
  return (
    <>
      <Box className='bannerCon'>
        <Box w={'100%'} h={'100%'} pos={'relative'} bg={''}>
          <Img className='homeBanner' src={banner}/>
          <Box  className='banner_tip' >Highlights</Box>
          <Box className='highlightText' >
            <Box className='title'>
              <Text>The sad ending of a road trip gone wrong</Text>
            </Box>
            <Box className='date'>
              <Text>Wed. 18/07/2024</Text>
              <Text className='author'>Gerald Lekara</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box w={'100%'} h={'600px'} className='recentPost' bg={''}>
        <Box className='title'>
          <Text>Recent Blog</Text>
        </Box>
        <Tabs>
          <TabList>
            <Tab>fashion</Tab>
            <Tab>sport</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <Box className='rowBlog'>
          <Box className='blogCon'>
            <BlogBox/>
            <BlogBox/>
            <BlogBox/>
            <BlogBox/>
          </Box>
        </Box>
            </TabPanel>
            <TabPanel>
            <Box className='rowBlog'>
          <Box className='blogCon'>
            <BlogBox/>
            <BlogBox/>
            <BlogBox/>
           
          </Box>
        </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box className='botw'>
        <Box className='botwCon'>
          <Box className="winner">
            <Box className='title'>
              <Text className='head'>Best of the week</Text>
             <Flex alignItems={'flex-end'} gap={'3px'}>
             <Text className='link'>see all post</Text>
             <FontAwesomeIcon className='icon' icon={faArrowRight}/>
             </Flex>
            </Box>
            <Box className='post'>
              {/* <Img src={travel}/> */}
              <Box className='text'>
                <Box className='tags'>
                  <Box>July 10, 2024</Box>
                  <Box>
                    <FontAwesomeIcon fontSize={'7px'} className='icon' icon={faCircle}/>
                    <Text>Travel</Text>
                  </Box>
                </Box>
              </Box>
              <Box className='btnCon'>
                <Box className='btn'>
                  <FontAwesomeIcon icon={faLocationArrow} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className='ads'>
            <Box className='adsBlock'>
              <Box className='head'>
                <Box className='btn'>
                  <FontAwesomeIcon icon={faCircle} fontSize={'5px'} />
                  <Text>ADS</Text>
                </Box>
                <Box className='icon'>
                  <FontAwesomeIcon icon={faPlus} />
                </Box>
              </Box>
              <Box className='title'>
                <Box>Become A BROADCAST MEMBER</Box>
                <Box>
                  <Text>Real talk in a corporate world+</Text>
                </Box>
              </Box>
              <Box className='link'>
                <Text>Learn more</Text>
              </Box>
            </Box>
            <Box className='allcate'></Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default HomeBanner;