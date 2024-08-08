import React from 'react'
import bg from '../assets/bg.png'

const MainContent = () => {
  return (
    <div className=' w-[100%] h-fit flex justify-center p-4 bg-discount-gradient  py-10 px-10'>
      <div className='flex flex-col md:flex-row justify-between items-center space-x-4 w-full mt-10'>
        <div className='h-96 flex flex-col justify-center items-center text-white md:w-1/2 w-full text-center'>
          <h1 className='text-white flex-1 font-poppins font-semibold ss:text-[100px] ss:leading-[100px]  text-[52px] leading-[75px]'>
            Enter The <br></br><span className='text-gradient shadow-xl rounded-full p-1'>Void</span>
          </h1>
          <p className='mb-4 text-lg md:text-xl lg:text-2xl text-white'>
            Get the experience of the <span className='text-gradient font-bold shadow-xl rounded-full p-1'>Next</span> Generation{' '}
            <span className='text-gradient font-bold shadow-xl rounded-full p-1'>ID Proof</span><br /><br />

          </p>
          <p className='text-gradient text-xl md:text:2xl font-bold shadow-xl rounded-full p-1'>Scan the QR Code above to Go</p>
        </div>
        <div className='md:w-1/2 w-full flex justify-center'>
          <img src={bg} alt='img' className='w-[40rem] ' />
        </div>
      </div>
    </div>

  )
}

export default MainContent
