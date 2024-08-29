import { Button,Stepper,  Group,  Text, TextInput,  Image, } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { Box,  Input, InputGroup } from '@chakra-ui/react';
import BlogTextEditor from './BlogTextEditor';
import { FaRegImage } from "react-icons/fa6";
import { CategoryService } from '../../services/CategoryService.service';
import { CreatePostDTO, postDTO, PostServices } from '../../services/PostService.service';
import Cookies from 'js-cookie';




const CreateBlog =()=> {
  const [blogBody, setBlogBody] = useState<string>('');
  const [displayImg, setDisplayImg] = useState<File| null>();
  const [viewImg, setViewImg] = useState<any>();
  // const [blogName, setBlogName]= useState<string>('')
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      blogImage: null as File | null,
    },

    validate: {
      name: (value)=> value.trim().length < 11 ? 'Blog title must be more than 10 characters' : null && nextStep()

    }
    });
   
  const categoryService = new CategoryService()
  const [allCate, setAllCate] = useState([])
  const displayCate = async()=>{
    const cate = await categoryService.getAllCategory();
    setAllCate(cate?.data);
    console.log(cate)
    console.log(allCate);
    console.log(allCate);
  }
 useEffect(()=>{
  displayCate()
  seeSelect();
 }, [])
  const [active, setActive] = useState(0);
  const [errMeg, setErrMeg] = useState<string>('');
  const nextStep = () => {
    setActive((current) => {
      if (form.getValues().name.trim().length <= 5) {
        setErrMeg('Blog heading must be greater than 5 characters')
        return current;
      }
      if (!displayImg) {
        setErrMeg('image is required')
        return current;
      }
      setErrMeg('');
      
      return current < 3 ? current + 1 : current;
    });
    
  }
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleDataFromChild = (data: string) => {
    setBlogBody(data);
    console.log(data);
    console.log(typeof(data))
    console.log(blogBody);
  };
  const handleAddImg = (e: any)=>{
      const files = e.target.files;
      if (files && files.length > 0) {
        setDisplayImg(e.target.files[0]);
      }
    
    const image = URL.createObjectURL(e.target.files[0])
    setViewImg(image);
  }
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setDisplayImg(null);
    setViewImg('');
  };
  const [selected, setSelected] = useState<string>('')

  const seeSelect = async ()=>{
    const postRes = await postService.getAllPost();
    setPost(postRes?.data);
    console.log(postRes);
    console.log(Post);
  

  }
  const [Post, setPost] = useState<postDTO[]>([])
  const blogDetails : CreatePostDTO ={
    title: form.getValues().name + selected,
    content: blogBody,
    author: Cookies.get('jwt'),
    publish: false,
    image: displayImg,
    category: Number(selected),
    images: undefined
  }
  const postService = new PostServices()
  const createPost = async()=>{
    try{
      const response = postService.createPost(blogDetails)
      console.log(response);
      console.log(await response);
      console.log(selected);
     
    }catch(error){
      console.log(error)
      console.log(selected)
    }
  }
  return (
    <>
       
          <Text fz={'20px'} fw={'700'}>Fill the form below</Text>
       <Box w={'100%'}  display={'flex'} pos={'sticky'} top={'0'} justifyContent={'center'} alignItems={'center'}>
       <form action="" style={{width: '70%',display: 'flex',flexDirection: 'column', gap: '30px'}} onSubmit={form.onSubmit((values)=> console.log(values))}>
        <Stepper w={'100%'} pos={'sticky'} top={'0'} active={active} >
        <Stepper.Step label="First step" description="Name your Post">
       <Box display={'flex'} w={'100%'}  flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
      <Box w={'70%'} display={'flex'} flexDir={'column'} gap={'10px'}>
      <Box w={'100%'}  display={'flex'} >
        <TextInput
          label="Heading"
          w={'100%'}
          placeholder="Fire outbreak at Aba main market"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
       </Box>
       {
        allCate && (
          <Box>

       {/* <MultiSelect
      label="Choose Blog category"
      placeholder="Pick value"
      clearable
      searchable  hidePickedOptions maxDropdownHeight={200} comboboxProps={{ shadow: 'md' }}
      maxValues={1}
      onChange={seeSelect}
      // value={[]}
      nothingFoundMessage="Nothing found..."
      data={allCate.map((cate: any)=> {
      //  console.log(cate.id)
        return  cate.Catename })}
    /> */}
        <label style={{fontWeight: '600', fontSize: '15px'}} htmlFor="category">Choose Category</label>
        <select value={selected} onChange={(e)=> {setSelected(e.target.value)
        
          console.log(selected);
        }} style={{width: '100%', padding: '8px', border: '1px solid #c0d9d9'}} name="category" id="">
          <option disabled>Choose category</option>
          {
            allCate && (
              allCate.map((cate: any)=>{
                return(
                  <option key={cate.id} value={cate.id}>{cate.Catename}</option>
                )
              })
            )
          }
        </select>
       </Box>
        )
       }
       <Box w={'100%'} display={'flex'} gap={'4px'} flexDir={'column'} justifyContent={''} mt={'10px'}>
        <Text fs={'30px'} fw={'600'}>Add Display image</Text>
        <InputGroup display={'flex'} w={'100%'} flexDir={'column'} gap={'5px'}>
        <Input type='file' display={'none'}
        ref={fileInputRef}
        // value={URL.createObjectURL(displayImg)} 
        border={'2px solid #e3e3e1'} onChange={handleAddImg} padding={'3px'} accept='image/png,image/jpeg' />
        {
          !viewImg && (
            <Box border={'3px solid #c0d9d9'} w={'100%'} h={'200px'} display={'flex'} justifyContent={'center'} flexDir={'column'} gap={'12px'} alignItems={'center'} onClick={handleButtonClick}> 
                <FaRegImage fontSize={'30px'}  />
                  select file
            </Box>
          )
        }
        </InputGroup>
        
       </Box>
       <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
       {
        viewImg && (
          <Image w={'60%'} h={'300px'} src={viewImg} />
        )
       }
       </Box>
       <Box>
        {
         viewImg &&  (<Button bg={'red'} onClick={handleResetFileInput}>Reset Image</Button>)
        }
       </Box>
      </Box>
      <Box>
        {
          errMeg && (
            <Text fs={'40px'} c={'red'}>
              {errMeg}
            </Text>
          )
        }
      </Box>
      
       </Box>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          <Box w={'100%'} h={'76vh'}>
          <BlogTextEditor childData={handleDataFromChild} initialValues={blogBody + selected} />
          </Box>
        </Stepper.Step>
        <Stepper.Completed>
        Completed! Form values:
          {/* <Code block mt="xl">
            {JSON.stringify(form.getValues(), null, 2)}
          </Code> */}
          <Button onClick={()=>{
            console.log(selected); createPost()}}>Post</Button>
           
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" >
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
        </form>
       </Box>
      
      
    </>
  );
}
export default CreateBlog;