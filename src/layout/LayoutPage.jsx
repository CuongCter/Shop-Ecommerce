import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../modules/Footer'
import Header from '../modules/Header'

const LayoutPage = () => {
    return (
        <Fragment>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </Fragment>
    )
}

export default LayoutPage