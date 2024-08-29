// import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { AddContactForm } from "../interface/ContactInterface"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { Input } from "@chakra-ui/react";


const AddContactSchema = z.object({
    firstName: z.string().min(1, { message: "first name is required" }),
    lastName: z
      .string()
      .min(1, { message: "last name is required" }),
    phoneNo: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters" }),
  });

  type AddContactFormInput = z.infer<typeof AddContactSchema>;

function AddContact() {
    const basedURL = "http://localhost:4040/api/v1/contact";

    const isContactExists = async(contactNo:string)=>{
      try{
        const response = await axios.get(`${basedURL}/getone/${contactNo}`);
        console.log(response)
      }catch(error){
        console.log(error);
        
      }
    }
    isContactExists('09075281633')
    const [errorMes, setErrorMes] = useState<string | null>(null)
    const addContact = async (data: AddContactForm)=>{
        try{
          const response = await axios.post<AddContactForm[]>(`${basedURL}`, data);
          console.log(response)
        }catch(error: any){
            console.log(error)
            setErrorMes(error.response.data.error)
        }
      }

    const {register, handleSubmit, formState: {errors}, reset} = useForm<AddContactFormInput>({
        resolver: zodResolver(AddContactSchema)
    })

    const onSubmit: SubmitHandler<AddContactForm> = (data)=>{
     
        addContact(data);
        if (!errorMes) {
          reset()
         }
        console.log(data);
        
        // document.location.reload()
    }
  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="name">
            <label htmlFor="firstname">First name</label>
            <input type="text"  id="firstname" placeholder="Gerald" {...register("firstName")} />
            {errors.firstName && <span className="errMeg">{errors.firstName.message}</span>}
        </div>
        <div className="name">
            <label htmlFor="lastname">Last name</label>
            <input type="text"  id="lastname" placeholder="Lekara" {...register("lastName")} />
            {errors.lastName && <span className="errMeg">{errors.lastName.message}</span>}
        </div>
        <div className="name">
            <label htmlFor="phoneno">Phone number</label>
            <Input type="text"  id="phoneno" placeholder="09075281633" {...register("phoneNo")} />
            {errors.phoneNo && <span className="errMeg">{errors.phoneNo.message}</span>}
            {errorMes && <span className="errMeg">{errorMes}</span>}
        </div>
       <div className="btn">
        <button type="submit">Add</button>
       </div>
      </form>
    </>
  )
}

export default AddContact