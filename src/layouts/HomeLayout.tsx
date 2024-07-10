import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../components/NavBar'

function HomeLayout() {
  return (
    <>
    <NavBar/>
        <Outlet/>
    </>
  )
}

export default HomeLayout