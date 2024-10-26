import React from 'react'
import Header from "./Header"
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='min-h-screen w-full flex flex-col'>
        <Header />
        <div className="flex-grow w-full flex justify-center items-center">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout
