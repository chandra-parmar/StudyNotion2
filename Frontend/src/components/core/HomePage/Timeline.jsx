import React from 'react'

const Timeline = ({logo,heading,para}) => {
  return (

    <div className='flex flex-row gap-7'>
      
      <div className='w-[50px] h-[50px] rounded-full border border-white bg-white shadow-xl flex  items-center justify-center overflow-hidden'>
         <img src={logo} alt='logo' className=' object-cover'></img>
      </div>
      

         <div className='flex flex-col'>
            <h3 className='text-richblack-900 text-[18px]'>{heading}</h3>
            <p className='text-base'>{para}</p>

        </div>

    </div>
  )
}

export default Timeline
