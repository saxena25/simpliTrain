
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import DashboardSideBar from './sidebar';
import { checkIsMobile } from '../../utils/helpers';

export async function dashboardLayoutLoader() {
  return {
    date: new Date().toISOString(),
  };
}

const DashboardLayout = () => {
    let location = useLocation();
    let {batchid} = useParams();
    console.log("courseId :", batchid);
    const [isProfile, setIsProfile] = useState(false);
    const isMobile = checkIsMobile();

    useEffect(() => {
      // console.log("courseId :", courseid);
    // console.log("checkHome", location.pathname);
    if (location && location.pathname == "/dashboard/profile" || location.pathname == "/dashboard" || location.pathname === `/dashboard/courses/${batchid}`) {
        setIsProfile(true);
    }
    }, []);

    return (
        <div className={`bg-white flex flex-row items-start justify-start  ${isProfile?'pl-16':'pl-80'} ${isMobile ? "pl-0" : ""}`}>
            <div className={`hidden md:flex h-[calc(100vh-65px)] fixed left-0 top-65 ${isProfile?'w-16':'w-80'}`}>
                <DashboardSideBar isProfile={isProfile} />
            </div>
            <div className='flex w-full'>
                <Outlet />
            </div>  
        </div>
  );
};

export default DashboardLayout;
