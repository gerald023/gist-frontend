import  { useEffect, useState } from 'react'
import '../App.css';
import {ContactInfo} from '../interface/ContactInterface'
import axios from 'axios';
import AddContact from '../components/AddContact';
import UpdateContact from '../components/UpdateContact';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Swal from 'sweetalert2';

export default function Contact() {
  const basedURL = "http://localhost:4040/api/v1/contact";
  const [AllContacts, setContacts] = useState<ContactInfo[]>([])
  const [Error, setError] = useState<string | null>(null)
  useEffect(()=>{
    const fetchContacts = async ()=>{
      try{
        const response = await axios.get<ContactInfo[]>(`${basedURL}`);
        console.log(AllContacts)
        
        setContacts(response.data);
      }catch(error){
        setError("Contacts failed to load")
        console.log(Error)
      }
    }
    fetchContacts()
  }, [])


  const deleteContact = async (id:number)=>{
    try{
      const response = await axios.delete(`${basedURL}/${id}`);
      console.log(AllContacts)
      setContacts(response.data);
    }catch(error){
      setError("Contacts failed to load")
    }
  }

  const whenDelete =(name: string, contactID:number)=>{
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    deleteContact(contactID);
    Swal.fire({
      title: "Deleted!",
      text: `${name}'s contact has been deleted.`,
      icon: "success"
    });
  }
});
  }
  return (
    <>
      <div className="contactPage">
        <div className="head">
            <h1>My Contacts</h1>
            <h1>Add Contact</h1>
        </div>
        <div className="contactInfo">
        <div className="contacts">
            {
              AllContacts.map((contact)=>{
                return(
                  <div key={contact.id} className='details'>
                <div className="info">
                    <div className="name">
                      {
                        `${contact.firstName} ${contact.lastName}`
                      }
                    </div>
                    <div className="number">
                      {contact.phoneNo}
                    </div>
                </div>
                <div className="edit">
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton isActive={isOpen} as={Button} borderRadius={"50%"} bg={"transparent"} className='editBtn'>
                        {isOpen ? 'X' : 'i'}
                      </MenuButton>
                      <MenuList>
                        <MenuItem padding={0}>
                        <UpdateContact firstName={contact.firstName} id={contact.id} lastName={contact.lastName} phoneNo={contact.phoneNo}/>
                        </MenuItem>
                        <MenuItem onClick={()=> whenDelete(contact.firstName, contact.id)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
                  
                </div>
            </div>
                )
              })
            }
            
        </div>
        <div className="add_contact">
          <AddContact/>
        </div>
        </div>
      </div>
    </>
  )
}
