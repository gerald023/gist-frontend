import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import HomePage from './pages/HomePage.tsx';
import Contact from './pages/Contact.tsx';
import HomeLayout from './layouts/HomeLayout.tsx';
import { ChakraProvider } from '@chakra-ui/react';

const Webrouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children: [
      {index: true, element: <HomePage/>},
      {path: "contacts", element: <Contact/>}
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
    <RouterProvider router={Webrouter }/>
    </ChakraProvider>
  </React.StrictMode>,
)
