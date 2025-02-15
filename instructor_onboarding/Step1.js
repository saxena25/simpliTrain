import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";


const tagCss =
  "text-base font-normal px-4 py-[0.3rem] rounded-full border border-text";

const Step1 = ({ onBoardingData, action, SkilsList }) => {
  const navigate = useNavigate();


  const checkAdded = (val) => {
    let skills = [...onBoardingData.skills];
    if (skills.includes(val)) {
      return "bg-primary text-white";
    } else {
      return "bg-white text-text";
    }
  };

  return (
    <>
      <div className="flex flex-row flex-wrap md:items-center justify-center w-full md:p-5 gap-3 px-5">
        {SkilsList.map((skil, index) => (
          <span
            key={index}
            onClick={() => {
              action(skil.id);
            }}
            className={clsx(tagCss, checkAdded(skil.id))}>
            {skil.name}
          </span>
        ))}
      </div>
    </>
  );
};

export default Step1;
