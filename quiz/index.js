import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Welcome from "./Welcome";

const QuizLayout = () => {
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
    <div className="h-full w-full bg-black bg-opacity-20 fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-[96%] h-[96%] rounded-[24px] p-6 overflow-y-auto shadow-lg">
      <XMarkIcon color="black" aria-hidden="true" className="h-8 w-8 fixed top-10 left-10" />

        <div className="flex flex-col justify-center items-center h-full overflow-y-auto">
          <Welcome />
        </div>
      </div>
    </div>
  );
};

export default QuizLayout;
