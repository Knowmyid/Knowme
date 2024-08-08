import React from 'react'
import logo from '../assets/logo.png'
import { IoQrCode } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='w-full'>
      <header className='bg-gray-900  text-white'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center py-4'>
            <div className='flex items-center space-x-4'>
              <img src={logo} alt='logo' className='h-[4rem] aspect-auto' />
              <span className='text-[2rem]  text-gradient font-bold '>Void</span>
            </div>
            <nav>
              <ul className='flex space-x-4'>
                <Link to={"/"} className='text-white font-semibold glow-effect rounded-full hover:underline'>Home</Link>

                <Link to={"/upload"} className='pr-2'>
                  <IoQrCode size={"30"} />
                </Link>

              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>

  )
}

export default Header
