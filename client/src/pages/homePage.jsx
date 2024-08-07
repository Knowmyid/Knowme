import React from 'react'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import Footer from '../components/Footer'
import DataRetrieve from '../components/DataRetrieve'


const HomePage = () => {
 
    return (
      <div>
      <Header/>
      <MainContent/>
      <DataRetrieve aadharData={aadharData}/>
      <Footer/>
      </div>
      
      
    )
}

export default HomePage
