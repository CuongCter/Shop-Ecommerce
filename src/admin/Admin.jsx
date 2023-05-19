import React from 'react'
import Sidebar from './components/Sidebar'
import MainDash from './components/MainDash/MainDash'
import RightSide from './components/RigtSide/RightSide'
import './admin.css'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Products from './components/pages/Products'
import { useEffect } from 'react'

const Admin = () => {
    const navigate = useNavigate()
    const roleID = localStorage.getItem('roleID');
    useEffect(()=>{
        if(roleID != 1){
            navigate('/login')
        }
    },[])
    
    return (
        <div className='Admin'>
            <div className="AdminGlass" >
                <Sidebar></Sidebar>
                <Outlet></Outlet>
                {/* <RightSide></RightSide> */}
            </div>
        </div>
    )
}

export default Admin