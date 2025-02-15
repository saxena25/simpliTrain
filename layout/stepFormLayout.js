import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SiteHeader from './header';
import { checkIsMobile } from '../utils/helpers';

export async function stepFormLayoutLoader() {
  return {
    date: new Date().toISOString(),
  };
}

const StepFormLayout = () => {
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
      <div style={{marginTop: 65}}>
        <Outlet />
      </div>  
    </div>
  );
};

export default StepFormLayout;
