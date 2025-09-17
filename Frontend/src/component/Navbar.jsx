import React from 'react'
import Logo from '../assets/ucet-logo.png'

function Navbar() { 
  return (
    <div className="flex justify-between items-center bg-primary p-4 shadow-md">
       <div className='container mx-auto flex justify-start items-center'>
        <div className='flex items-center gap-5'>
                <img src={Logo} alt="logo" className="h-[70px] w-[70px] object-contain" />
                <div className='flex flex-col'>
                    <span className='text-2xl tracking-wide font-semibold text-white sm:text-3xl'>
                        UCET Admin
                    </span>
                    <span className='text-sm tracking-tight font-normal text-white/90 sm:text-xl'>
                        Anna University
                    </span>
                </div>
        </div>
       </div>
    </div>
  )
}

export default Navbar