import React from 'react'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import Footer from '../components/Footer'
import DataRetrieve from '../components/DataRetrieve'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'


const HomePage = () => {

  const { user } = useAuth0();
  console.log("Current User:", user);
  return (
    <div className='bg-primary'>
      <Header />
      <Outlet />
      <Footer />
    </div>


  )
}

export default HomePage
