import React from 'react'
import Logo from '../assets/ucet-logo.png'

function Navbar() { 
  return (
    <div className="flex justify-between items-center bg-primary p-4">
       <div className='container m-auto flex flex-start'>
        <div className='flex items-center gap-5 justify-center max-w-[992px]'>
                <img src={Logo} alt="logo" className="h-[70px] w-[70px]" />
                <p className='text-white text-2xl font-bold flex flex-col'>
                    <span className='text-2xl tracking-wide font-semibold sm:text-3xl'>
                        UCET Admin
                    </span>
                    <span className='text-sm tracking-tighter font-normal sm:text-xl'>
                        Anna University
                    </span>
                </p>
        </div>
       </div>
    </div>
  )
}

export default Navbar
