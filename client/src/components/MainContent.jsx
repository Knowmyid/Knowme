import React from 'react'
import bg from '../assets/bg.png'

const MainContent = () => {
  return (
   <div className=' w-[100%] h-[100vh] flex justify-center p-4 bg-gradient-to-r from-[#555555] to-black'>
  <div className='flex flex-col md:flex-row justify-center items-center space-x-4 w-full max-w-5xl'>
    <div className='h-96 flex flex-col justify-center items-center text-white md:w-1/2 w-full'>
      <h1 className='text-4xl md:text-5xl text-black font-bold mb-4'>
        Do you want to <span className='text-gradient shadow-xl rounded-full p-1'>KnowMe</span>
      </h1>
      <p className='mb-4 text-lg md:text-xl text-start text-white'>
        Get the experience of the <span className='text-gradient font-bold shadow-xl rounded-full p-1'>Next</span> Generation{' '}
        <span className='text-gradient font-bold shadow-xl rounded-full p-1'>ID Proof</span><br/><br/>
        Merging the latest technologies like blockchain(polygon),ana-aadhaar and graph we bring to you a private ID Proof
      </p>
      <p className='text-gradient text-xl md:text:2xl font-bold shadow-xl rounded-full p-1'>Scan the QR Code above to Go</p>
    </div>
    <div className='md:w-1/2 w-full flex justify-center'>
      <img src={bg} alt='img' className='w-[500px] md:w-[800px]'/>
    </div>
  </div>
</div>

  )
}

export default MainContent
