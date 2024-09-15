import React from 'react'
import logo from '../assets/logo.png'
import { IoQrCode } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
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
              <ul className='flex space-x-4 justify-center items-center'>
                <Link to={"/"} className='text-white font-semibold glow-effect rounded-full hover:underline'>Home</Link>
                {
                  isAuthenticated ? (

                    <div className='flex space-x-4 justify-center items-center'>
                      <Link to={"/data"} className='text-white font-semibold glow-effect rounded-full hover:underline'>
                        Share
                      </Link>

                      <Link to={"/user-dashboard"} className='text-white font-semibold glow-effect rounded-full hover:underline'>
                        Dashboard
                      </Link>

                      <button
                        className="text-white font-semibold glow-effect rounded-full hover:underline"
                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                      >
                        Logout
                      </button>
                      <img src={user.picture} width={40} className='rounded-full' />
                    </div>

                  ) : (
                    <button
                      className="text-white font-semibold glow-effect rounded-full hover:underline"
                      onClick={() => loginWithRedirect()}>
                      Log In
                    </button>
                  )
                }
              </ul>
            </nav>
          </div>
        </div >
      </header >
    </div >

  )
}

export default Header
