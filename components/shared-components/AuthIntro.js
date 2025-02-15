// AuthIntro
import React from 'react';

const AuthIntro = () => {
  return (
    <div className='w-full h-full bg-gray-6 flex flex-col justify-end items-start pl-20 pb-20'>
      <div>
        <h3 className='text-3xl text-text mb-10 font-medium'>Shape Your Tomorrow with Simplitrain</h3>
        <ul className='list-none m-0 p-0'>
          <li className='flex flex-row gap-5 justify-start items-center mb-10'>
            <div style={{width:'50px', height:'50px'}} className='rounded-lg bg-gray-5'></div>
            <div>
              <h3 className='text-xl text-text font-medium'>{'Tailored Learning Paths'}</h3>
              <p className='text-base text-text'>{'Courses aligned with your career goals and industry demands.'}</p>
            </div>
          </li>
          <li className='flex flex-row gap-5 justify-start items-center mb-10'>
            <div style={{width:'50px', height:'50px'}} className='rounded-lg bg-gray-5'></div>
            <div>
              <h3 className='text-xl text-text font-medium'>{'Flexible Learning Formats'}</h3>
              <p>{'Courses aligned with your career goals and industry demands.'}</p>
            </div>
          </li>
          <li className='flex flex-row gap-5 justify-start items-center mb-10'>
            <div style={{width:'50px', height:'50px'}} className='rounded-lg bg-gray-5'></div>
            <div>
              <h3 className='text-xl text-text font-medium'>{'Expert Instructors'}</h3>
              <p className='text-base text-text'>{'Courses aligned with your career goals and industry demands.'}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthIntro;
