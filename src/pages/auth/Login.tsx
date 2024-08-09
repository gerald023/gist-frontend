import { Box, ChakraProvider, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Text } from '@chakra-ui/react'
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler ,useForm } from "react-hook-form";
import '../../styles/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginSchema = z.object({
    email: z
      .string()
      .min(5, { message: "email must be greater that 5 characters" })
      .regex(emailRegex, { message: "Invalid email address" }),
      password: z
      .string()
      .min(7, {message: "password must be greater that 7 characters"}),
  })

function Login() {

    type AddUserFormInput = z.infer<typeof LoginSchema>;
    const [reqError, setReqErr] = useState<string>()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handlePassword = ()=>{
    setShowPassword(!showPassword)
}
const basedURL = "http://localhost:4040/api/v1/user/login";
const userLogin = async (data: AddUserFormInput)=>{
    setLoading(true)
    try{
      const response = await axios.post<AddUserFormInput[]>(`${basedURL}`, data);
      console.log(response)
      console.log(typeof(response.data))
      const jwt : string = response.data.toString();
      Cookies.set('jwt', jwt, {expires: 2} )
      console.log( Cookies.get('jwt'))
      console.log(response.headers)
      setReqErr('');
    }catch(error: any){
        console.log(error.response.data.error)
        setReqErr(error.response.data.error)
    }finally{
        setLoading(false)
    }
  }
const {register, handleSubmit, formState: {errors}, reset} = useForm<AddUserFormInput>({
resolver: zodResolver(LoginSchema)
})
const onSubmit: SubmitHandler<AddUserFormInput> = (data)=>{
    userLogin(data);
       if (!reqError) {
         reset()
        }
       console.log(data);
       
       // document.location.reload()
   }
  return (
    <>
       <ChakraProvider>
       <Box className="auth_con">
       <form onSubmit={handleSubmit(onSubmit)} action="">
           
           
            <Box>
            <InputGroup className="signup">
            <FormLabel>Email</FormLabel>
           <Box className="addon">
           <InputLeftAddon className="left_addon">
                <FontAwesomeIcon icon={faEnvelope}/>
            </InputLeftAddon>
            <Input type="email" {...register("email")} placeholder="geraldlekara@gmail.com"/>
           </Box>
            </InputGroup>
            {errors.email && <span className="errmeg">{errors.email.message}</span>}
            </Box>
            <Box>
            <InputGroup className="signup">
            <FormLabel>Password</FormLabel>
            <Box className="addon">
                <InputLeftAddon>
                <FontAwesomeIcon icon={faLock}/>
                </InputLeftAddon>
            <Input type={showPassword ? "text" : "password"} placeholder="*******" {...register("password")} />
            <InputRightAddon onClick={handlePassword}><FontAwesomeIcon icon={faEye} /></InputRightAddon>
            </Box>
            </InputGroup>
            {errors.password && <span className="errmeg">{errors.password.message}</span>}
            </Box>
         
            {
                reqError && <Text color={'red'} fontWeight={'600'} fontSize={'17px'}>{reqError}</Text>
            }
            <Box>
                <button className={loading ? "disable": "formbtn"} disabled={loading} type="submit">
                {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </Box>
        </form>
       </Box>
       </ChakraProvider>
    </>
  )
}

export default Login
