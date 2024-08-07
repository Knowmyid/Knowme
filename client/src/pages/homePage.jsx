import React from 'react'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import Footer from '../components/Footer'
import DataRetrieve from '../components/DataRetrieve'
import { Outlet } from 'react-router-dom'


const HomePage = () => {
    const aadharData = {
        name: 'John Doe',
        dob: '01/01/1990',
        address: '123 Main St, Anytown, India',
        phone: '1234567890',
      };
    return (
      <div>
      <Header/>
      <Outlet/>
      <Footer/>
      </div>
      
      
    )
}

export default HomePage
