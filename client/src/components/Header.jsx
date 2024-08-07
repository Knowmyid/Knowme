import React from 'react'
import logo from '../assets/logo.png'
import { IoQrCode } from "react-icons/io5";

const Header = () => {
  return (
    <div>
      <header className='bg-gradient-to-r from-[#555555] to-black text-white'>
        <div className='container mx-auto flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
                <img src={logo} alt='logo' className='h-10 w-10'/>
                <span className='text-xl logo-gradient font-bold glow-effect'>Knowme</span>
            </div>
            <nav>
                <ul className='flex space-x-4'>
                    <li className='text-white font-semibold glow-effect rounded full'>Home</li>
                    <li className=''><IoQrCode size={"30"}/></li>
                </ul>
            </nav>
        </div>
    </header>
    </div>
  )
}

export default Header
