import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '../components/shared-components/Logo';
import { Container } from '../components/ui-components';

// const { Content, Header, Footer } = Layout;

const FullScreenMessageLayout = () => {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);
  return (
    // <Container style={{width:'100%', maxWidth:'100%'}}>
      <div className='flex flex-col gap-0 w-full h-full p-10'>
        <div className='flex items-start'>
          <div>
            <Logo />
          </div>
        </div>
        <div className='flex w-full h-full justify-center items-center p-5'>
          <Outlet />    
        </div>
      </div>
    // </Container>
  );
};

export default FullScreenMessageLayout;
