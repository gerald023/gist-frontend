import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {  useForm } from "react-hook-form";
import axios from 'axios';


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

// type data = {

// }

function UpdateContact({firstName, lastName, phoneNo, id}: { firstName: string, lastName: string, phoneNo: string, id: number}) {

    const {register, formState: {},} = useForm<AddContactFormInput>({
        resolver: zodResolver(AddContactSchema)
    })

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [FirstName, setFirstName] = useState(firstName)
    const [LastName, setLastName] = useState(lastName)
    const [PhoneNo, setPhoneNo]= useState(phoneNo)

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null);

  const basedURL = "http://localhost:4040/api/v1/contact"
  const updateContact = async ( )=>{

    try{
      const response = await axios.put(`${basedURL}/${id}`, {
        firstName: FirstName,
        lastName: LastName,
        phoneNo: PhoneNo
      });
      console.log(response)
    }catch(error){
        console.log(error)
    }
  }

  return (
    <>

{/* <Button w={"100%"} bg={"transparent"} display={"flex"} justifyContent={"flex-start"} h={"100%"}>Edit</Button> */}
<Text w={"100%"} h={"100%"} padding={'10px'}  onClick={onOpen}>Edit</Text>
     

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Contact</ModalHeader>
          <ModalCloseButton />
          <form action="" onSubmit={updateContact}>
          <ModalBody pb={6}>
           
           <FormControl>
              <FormLabel>First name</FormLabel>
              <Input  value={FirstName} {...register("firstName")} onChange={(e)=>setFirstName(e.target.value)} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input value={LastName} onChange={(e)=> setLastName(e.target.value)} placeholder='Last name' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input value={PhoneNo} onChange={(e)=> setPhoneNo(e.target.value)} placeholder='090344355' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button  onClick={onClose}>Cancel</Button>
          </ModalFooter>
           </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateContact