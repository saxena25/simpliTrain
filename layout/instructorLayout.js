import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SiteHeader from './header';
import InstructorSidebar from '../components/shared-components/InstructorSidebar';
import { checkIsMobile } from '../utils/helpers';

export async function instructorLayoutLoader() {
  return {
    date: new Date().toISOString(),
  };
}


const InstructorLayout = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [isProfile, setIsProfile] = useState(false);
  const isMobile = checkIsMobile();
  
  useEffect(() => {
    // if (location && location.pathname == "/Instructor_courses/dashboard/batch_listing" || location.pathname == "/Instructor_courses/dashboard/course_listing") {
    //     setIsProfile(false);
    // }else{
    //     setIsProfile(true)
    // }
  }, []);
  return (
    <div className="bg-white relative">
      <SiteHeader />
      <div style={{marginTop:65}}>
        <div className="bg-white flex flex-row items-start justify-start">
          <div className={`flex h-[calc(100vh-64px)] sticky top-0 ${isProfile?'w-16':'w-80'}`}>
              <InstructorSidebar isProfile={isProfile} />
          </div>
          <div className='flex w-full'>
              <Outlet />
          </div>  
        </div>
      </div>  
    </div>
  );
};

export default InstructorLayout;
