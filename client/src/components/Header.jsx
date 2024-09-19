import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { HiMenu, HiX } from "react-icons/hi"; // Importing icons for mobile menu

const Header = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='w-full'>
      <header className='bg-gray-900 text-white'>
        <div className='mx-auto px-4'>
          <div className='flex justify-between items-center py-2'>
            {/* Logo Section */}
            <div className='flex items-center space-x-4'>
              <img src={logo} alt='logo' className='h-[5rem] md:h-[4rem] aspect-auto' />
              <span className='text-[1.5rem] md:text-[2rem] font-bold'>Void</span>
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 items-center justify-center">
              <Link to={"/"} className='text-white font-semibold glow-effect rounded-full hover:underline'>Home</Link>
              {isAuthenticated ? (
                <div className='flex space-x-4 items-center'>
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
                  <img src={user.picture} width={40} className='rounded-full' alt="user profile" />
                </div>
              ) : (
                <button
                  className="text-white font-semibold glow-effect rounded-full hover:underline"
                  onClick={() => loginWithRedirect()}>
                  Log In
                </button>
              )}
            </nav>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4">
              <ul className='flex flex-col space-y-4 items-start'>
                <Link to={"/"} className='text-white font-semibold glow-effect rounded-full hover:underline'>Home</Link>
                {isAuthenticated ? (
                  <div className='flex flex-col space-y-4 items-start'>
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
                    <img src={user.picture} width={40} className='rounded-full' alt="user profile" />
                  </div>
                ) : (
                  <button
                    className="text-white font-semibold glow-effect rounded-full hover:underline"
                    onClick={() => loginWithRedirect()}>
                    Log In
                  </button>
                )}
              </ul>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
