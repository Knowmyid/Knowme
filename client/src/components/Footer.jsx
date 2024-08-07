import React from 'react'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <div className='w-[100%]'>
      <footer className='bg-gradient-to-r from-[#555555] to-black text-white p-4'>
        <div className='container flex justify-between flex-row mx-auto text-center'>
            <img src={logo} alt='logoo' className='h-[80px]'/>
            <p className='p-2 text-left'>Location: GT Goviea Suites,Hacker House Goa,Goa</p>
            <div className='flex flex-col overflow-auto flex-wrap'>
            <p className='p-1 overflow-auto'>Contact:goutamkumar.sharmq@gmail.com</p>
            <p className='text-start pl-0.5 overflow-auto'>Phone: 858935035603</p>
            </div>
        </div>
        <div className='flex flex-row mx-auto justify-center'>
        <p>&copy;2024 Knowme.All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
