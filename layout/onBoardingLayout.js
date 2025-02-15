import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import AuthIntro from '../components/shared-components/AuthIntro';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import AuthFooter from '../components/shared-components/AuthFooter';
import { Logo } from '../components/shared-components/Logo';

// const { Content, Header, Footer } = Layout;

const OnBoardingLayout = () => {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);
  return (
    <div className='flex flex-col gap-0 w-full h-full md:p-10 py-10 px-2'>
      <div className='flex items-center justify-between '>
        <div className='justify-start hidden md:flex'>
          <Logo />
        </div>
        <div className='flex justify-center'>
            
        </div>
        <div className='flex justify-end pr-4 md:p-0'>
          <a href="/" color='text' className={'font-medium'}>{'SKIP'}</a>
        </div>
      </div>
      <div className='flex w-full h-full justify-center items-center p-5'>
        <Outlet />    
      </div>
    </div>
  );
};

export default OnBoardingLayout;
