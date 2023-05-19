import React from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'
import RightSide from '../RigtSide/RightSide'

const LayoutAdmin = () => {
  return (
    <>
        <Sidebar></Sidebar>
        <Outlet></Outlet>
        <RightSide></RightSide>
    </>
  )
}

export default LayoutAdmin