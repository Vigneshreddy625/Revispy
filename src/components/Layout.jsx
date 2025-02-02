import React from 'react'
import Header from "./Header"
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <div className="fixed right-0 left-0 z-50 backdrop-filter backdrop-blur-lg bg-background">
        <Header />
        </div>
        <div className="max-w-[1500px] mt-16 flex-grow flex justify-center items-center lg:min-h-screen">
            <Outlet />
        </div>
        <div className="hidden md:block">
        <Footer />
        </div>
    </div>
  )
}

export default Layout
