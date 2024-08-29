import { Box, FormLabel,  Input, InputGroup, InputLeftAddon, InputRightAddon, Text } from "@chakra-ui/react";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler ,useForm } from "react-hook-form";
import '../../styles/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import axios from "axios";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;




function SignUp() {
    const SignUpSchema = z.object({
        firstName: z.string()
        .min(3, { message: "first name is should be greater than 3" }),
        lastName: z
          .string()
          .min(1, { message: "last name should be greater than 3" }),
        email: z
          .string()
          .min(5, { message: "email must be greater that 5 characters" })
          .regex(emailRegex, { message: "Invalid email address" }),
          password: z
          .string()
          .min(7, {message: "password must be greater that 7 characters"}),
        //   confirmPassword: z
        //   .string()
        //   .min(7, {message: "password must be more than 7 characters"})        //   .regex(passwordRegex, {message: "password must contain at least one capital letter 'A', one small letter 'a', one number '3' and one special character '#' "})
      })
    //   .refine(data => data.password === data.confirmPassword, {
    //     message: "password does not match",
    //     path: ["confirmPassword"],
    //   });
      type AddUserFormInput = z.infer<typeof SignUpSchema>;
      const [reqError, setReqErr] = useState<string>()
    const [showPassword, setShowPassword] = useState<boolean>(false)
        const handlePassword = ()=>{
            setShowPassword(!showPassword)
        }
        // const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
        const [loading, setLoading] = useState<boolean>(false)
        // const handleConfirmPassword = ()=>{
        //     setShowConfirmPassword(!showConfirmPassword)
        // }
        const basedURL = "http://localhost:4040/api/v1/user/signup";
        const signup = async (data: AddUserFormInput)=>{
            setLoading(true)
            try{
              const response = await axios.post<AddUserFormInput[]>(`${basedURL}`, data);
              console.log(response)
            }catch(error: any){
                console.log(error.response.data.error)
                setReqErr(error.response.data.error)
            }finally{
                setLoading(false)
            }
          }
    const {register, handleSubmit, formState: {errors}, reset} = useForm<AddUserFormInput>({
        resolver: zodResolver(SignUpSchema)
        
    })

    const onSubmit: SubmitHandler<AddUserFormInput> = (data)=>{
     signup(data);
        // if (!errorMes) {
          reset()
        //  }
        console.log(data);
        
        // document.location.reload()
    }
  return (
    <>
      <Box className="auth_con">
        <form onSubmit={handleSubmit(onSubmit)} action="">
            <Box >
            <InputGroup className="signup">
            <FormLabel>First name</FormLabel>
            <Input type="text" {...register("firstName")} placeholder="Gerald"/>
            </InputGroup>
            {errors.firstName && <span className="errmeg">{errors.firstName.message}</span>}
            </Box>
            <Box>
            <InputGroup className="signup">
            <FormLabel>Last name</FormLabel>
            <Input type="text" {...register("lastName")} placeholder="Lekara"/>
            </InputGroup>
            {errors.lastName && <span className="errmeg">{errors.lastName.message}</span>}
            </Box>
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
            {/* <Box>
            <InputGroup className="signup">
            <FormLabel>Confirm Password</FormLabel>
            <Box className="addon">
                <InputLeftAddon>
                <FontAwesomeIcon icon={faLock}/>
                </InputLeftAddon>
            <Input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} placeholder="*******"/>
            <InputRightAddon onClick={handleConfirmPassword}><FontAwesomeIcon icon={faEye}/></InputRightAddon>
            </Box>
            </InputGroup>
            {errors.confirmPassword && <span className="errmeg">{errors.confirmPassword.message}</span>}
            
            </Box> */}
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
    </>
  )
}

export default SignUp
