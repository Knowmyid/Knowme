import React from 'react'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import Footer from '../components/Footer'
import DataRetrieve from '../components/DataRetrieve'
import { Outlet } from 'react-router-dom'


const HomePage = () => {
    return (
       <div className='bg-primary'>
      <Header/>
      <Outlet/>
      <Footer/>
      </div>
      
      
    )
}

export default HomePage
