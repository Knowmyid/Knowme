import React from 'react';
import logo from '../assets/logo.png';
import { FaFacebook,FaTwitter,FaInstagram,FaLinkedin} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full'>
      <footer className='bg-gradient-to-r from-[#555555] to-black text-white p-6'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left'>
          <div className='flex flex-col items-center md:items-start mb-6 md:mb-4'>
          <img src={logo} alt='logo' className='h-[80px] mb-4 ' />
          <p>Your trusted partner in Digital Identity</p>
          </div>
          <div>
          <p className='md:mr-8 mb-4 md:mb-0'>Location: GT Goviea Suites, Hacker House Goa, Goa</p>
          </div>
          <div className='flex flex-col md:items-start'>
            <p className='mb-1'>Contact: ceo@kairos.com</p>
            <p>Phone: 858935035603</p>
          </div>
          <div className='flex flex-col items-center md:items-start'> 
            <h4 className='text-lg font-semibold mb-2'> Follow Us</h4>
            <div className='flex space-x-4'>
              <a><FaFacebook/></a>
              <a><FaInstagram/></a>
              <a><FaTwitter/></a>
              <a><FaLinkedin/></a>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center mt-6'>
          <p className='text-sm md:text-base'>&copy;2024 Knowme. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
