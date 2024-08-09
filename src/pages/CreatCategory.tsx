import React, { useEffect } from 'react'
import { Box, Button, FormLabel, Icon, Img, Input, InputGroup, InputLeftAddon, InputRightAddon, Text } from "@chakra-ui/react";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler ,useForm } from "react-hook-form";
import '../styles/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import {CategoryService} from '../services/CategoryService.service'
import axios from 'axios';

function CreatCategory() {
    const cateService = new CategoryService();
    const CategorySchema = z.object({
        name: z.string()
        .min(3, { message: "first name is should be greater than 3" }),
        description: z
          .string()
          .min(10, { message: "last name should be greater than 3" }),
        // image: z.instanceof(FileList).optional()
      });

      type AddUserFormInput = z.infer<typeof CategorySchema>;
      const [reqError, setReqErr] = useState<string>();
      const [loading, setLoading] = useState<boolean>(false)

      const {register, handleSubmit, formState: {errors}, reset} = useForm<AddUserFormInput>({
        resolver: zodResolver(CategorySchema)

    })

    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [cate, setCate] = useState<[]>([])
    
    const allCate = async ()=>{
      const response = await cateService.getAllCategory();
      console.log(response);
      console.log(response?.data);
      setCate(response?.data);
    }
    useEffect(()=>{
     
     allCate();
      // setCate(response);
    }, [])
    
      const onSubmit:  SubmitHandler<AddUserFormInput>  = async (data)=>{
        setLoading(true)
        try{
          const response = await cateService.createCategory(
            data.name, data.description, file
          )
           
            console.log(response);
            return response;
        }catch(error){
            console.log(error);
        }
             reset()
           console.log(data);
           
           // document.location.reload()
       }
  
  return (
    <>
         <Box className="auth_con" marginTop={'100px'}>
        <form onSubmit={handleSubmit(onSubmit)} action="">
            <Box >
            <InputGroup className="signup">
            <FormLabel>Category name</FormLabel>
            <Input type="text" {...register("name")}   placeholder="Gerald"/>
            </InputGroup>
            {errors.name && <span className="errmeg">{errors.name.message}</span>}
            </Box>
            
            <Box>
            <InputGroup className="signup">
            <FormLabel>Description</FormLabel>
            <Input type="text" {...register("description")}  placeholder="Lekara"/>
            </InputGroup>
            {errors.description && <span className="errmeg">{errors.description.message}</span>}
            </Box>
            <Box>
            <InputGroup className="signup">
            <FormLabel>Image</FormLabel>
            <Input type="file" onChange={(e:any)=> setFile(e.target.files[0])} placeholder="Lekara"/>
            </InputGroup>
            {/* {errors.image && <span className="errmeg">{errors.image.message}</span>} */}
            </Box>
           
            {
                reqError && <Text color={'red'} fontWeight={'600'} fontSize={'17px'}>{reqError}</Text>
            } 
            <Box>
                <button className={loading ? "disable": "formbtn"}  disabled={loading} type="submit">
                {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </Box>
        </form>
      </Box>

            <Box display={'flex'} w={'100%'} flexDir={'column'} gap={'10px'} alignItems={'center'} justifyContent={'center'} >
            {/* {
                cate?.map((cat: any) =>{
                  return(
                    <Box display={'flex'} key={cat.id}>
                      <Text>{cat.Catename}</Text>
                      <Text>{cat.description}</Text>
                      <Img src={cat.images[0]} />
                    </Box>
                  )
                })
              } */}
            </Box>
    </>
  )
}

export default CreatCategory
