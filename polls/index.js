import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const PollLayout = () => {
  let location = useLocation();
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    if (
      (location && location.pathname == "/dashboard/profile") ||
      location.pathname == "/dashboard"
    ) {
      setIsProfile(true);
    }
  }, []);

  return (
    <div className="bg-white flex flex-row items-start justify-start">
      <div className="flex w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default PollLayout;
