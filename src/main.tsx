import './global.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import HomePage from './pages/HomePage.tsx';
import Contact from './pages/Contact.tsx';
import HomeLayout from './layouts/HomeLayout.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import Auth from './pages/auth/Auth.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import Login from './pages/auth/Login.tsx';
import CreatCategory from './pages/CreatCategory.tsx';
import CreateBlog from './pages/posts/CreateBlog.tsx';
import { MantineProvider } from '@mantine/core';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css'
import AllPost from './pages/posts/AllPost.tsx';
import MakePayment from './pages/shop/MakePayment.tsx';
import OnePostPage from './pages/posts/OnePostPage.tsx';

const Webrouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children: [
      {index: true, element: <HomePage/>},
      {path: "contacts", element: <Contact/>},
      {path: "category", element: <CreatCategory/>},
      {path: 'all-post', element: <AllPost/>},
      {path: 'payment', element: <MakePayment/>},
      {
        path: '/post/:id',
        element: <OnePostPage/>
      }
    ]
  },
  
  {
    path: 'auth',
    element: <Auth/>,
    children: [
      {index: true, element: <SignUp/>},
      {path: "login", element: <Login/>}
    ]
  },
  // {
  //   path: 'create-post',
  //   element: <BlogTextEditor/>
  // },
  {path: 'text', element: <CreateBlog/>}
])



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
    <ChakraProvider>
    <RouterProvider router={Webrouter }/>
    </ChakraProvider>
    </MantineProvider>
  </React.StrictMode>,
)
