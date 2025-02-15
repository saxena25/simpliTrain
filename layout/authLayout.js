import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import AuthIntro from '../components/shared-components/AuthIntro';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import AuthFooter from '../components/shared-components/AuthFooter';

// const { Content, Header, Footer } = Layout;

const AuthLayout = () => {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 gap-0 w-full h-full'>
      <div className='hidden md:flex'>
        <AuthIntro />
      </div>
      <div className='flex justify-center w-full'>
        <div className='h-full w-full bg-white flex flex-col justify-center items-start'>
          <div className='flex justify-start items-center w-full p-5'>
            <button type="button" onClick={()=>navigate(-1)} className='bg-gray-4 text-gray-2 p-2 rounded-full'><ChevronLeftIcon aria-hidden="true" className="size-5" /></button>
          </div>
          <div className='w-full p-5 max-w-[420px] m-auto text-center'>
            <Outlet />    
          </div>
          <div className='flex justify-center items-center w-full p-5'>
            <AuthFooter />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AuthLayout;
