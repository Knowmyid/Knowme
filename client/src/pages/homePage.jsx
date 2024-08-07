import React from 'react'

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
      {/* <MainContent/> */}
      <DataRetrieve aadharData={aadharData}/>
      <Footer/>
      </div>
      
      
    )
}

export default homePage
