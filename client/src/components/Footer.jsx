import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <div className='w-full'>
      <footer className='bg-gradient-to-r from-[#555555] to-black text-white p-4'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left'>
          <img src={logo} alt='logo' className='h-[80px] mb-4 md:mb-0' />
          <p className='md:mr-8 mb-4 md:mb-0'>Location: GT Goviea Suites, Hacker House Goa, Goa</p>
          <div className='flex flex-col md:items-start'>
            <p className='mb-1'>Contact: goutamkumar.sharmq@gmail.com</p>
            <p>Phone: 858935035603</p>
          </div>
        </div>
        <div className='flex justify-center mt-4'>
          <p>&copy;2024 Knowme. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
