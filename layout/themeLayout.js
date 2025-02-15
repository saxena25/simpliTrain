
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SiteHeader from './header';
import SiteFooter from './footer';
import { useLocation } from 'react-router-dom';
import Notification from '../components/ui-components/Notifications';
import { checkIsMobile } from '../utils/helpers';

const ThemeLayout = () => {
  const [fetching, setFetching] = useState(true);
  const [isChat, setIsChat] = useState(false);
  const isMobile = checkIsMobile();

   let location = useLocation();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      // console.log("checkHome", location);
      if (location && (location.pathname.includes("/chat")  || location.pathname.includes("/dashboard")) ) {
        setIsChat(true);
      }else{
        setIsChat(false);
      }
    }, [location]);

  return (
    <div className="bg-white relative">
      <SiteHeader />
      <div style={{marginTop: isMobile ? 0 : 65}}>
        <Outlet />
        <Notification open={false} autoClose={false} type={'info_with_action'} action={()=>{}} />
        {
          isChat ? null : <SiteFooter />
        } 
      </div> 
      
    </div>
  );
};

export default ThemeLayout;
