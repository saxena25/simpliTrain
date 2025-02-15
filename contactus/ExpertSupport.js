import React from 'react';
import { checkIsMobile } from '../../utils/helpers';

function ExpertSupport() {
    const isMobile = checkIsMobile();
  return (
    <>
        <div className={`bg-[#E9E9E9] w-full  md:h-[471px] flex flex-col items-center gap-10 justify-center ${isMobile ? "py-16" : ""}`}>
            <h1 className='text-3xl md:text-5xl font-bold md:font-medium'>{isMobile ? "Need Help? Contact Us!" : "Get in Touch for Expert Support!"}</h1>
            <div className='flex flex-col md:flex-row gap-10 md:gap-32'>
                <div className='w-96 h-40  flex flex-col items-center text-center px-4 gap-1 md:gap-3'>
                    <div className='w-8 h-8 bg-[#D9D9D9] rounded-full'></div>
                    <h2 className='text-xl md:text-2xl text-[#000000B2] font-medium'>Learners</h2>
                    <p className='text-sm md:text-base text-[#000000B2]'>Please reach out to us at <b>learnersupport@simplitrain.com</b>, and our team will respond within 24 hours to assist you.</p>
                </div>
                <div className='w-96 h-40 flex flex-col items-center text-center px-5 md:px-0 gap-1 md:gap-3'>
                    <div className='w-8 h-8 bg-[#D9D9D9] rounded-full'></div>
                    <h2 className='text-xl md:text-2xl text-[#000000B2] font-medium'>Instructors</h2>
                    <p className='text-sm md:text-base text-[#000000B2]'>Please reach out to us at <b>learnersupport@simplitrain.com</b>, and our team will respond within 24 hours to assist you.</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default ExpertSupport
