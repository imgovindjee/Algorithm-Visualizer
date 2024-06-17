import React from 'react'

import { Link } from 'react-router-dom'
import { Outlet, useLocation } from 'react-router'

import logo from '../../assets/Images/logo.png'

import './NavBar.scss'


const NavBar = ({ message }) => {

    return (
        <>
            <div className='m-auto topbar'>
                <nav className='navbar'>
                    <div className='flex items-center gap-6'>
                        <Link to={'/'}>
                            <img
                                src={logo}
                                alt=""
                                width={40}
                            />
                        </Link>
                        <span className='text-white text-xl capitalize line-clamp-1'>
                            {message.replace('-', " ")}
                        </span>
                    </div>

                    <div className='details'>
                        <Link to={'/'} className={`navLink`}>
                            Home
                        </Link>
                        <Link to={'/about-developer'} className={`navLink `}>
                            About
                        </Link>
                    </div>
                </nav>
            </div>

            <Outlet />
        </>
    )
}

export default NavBar
