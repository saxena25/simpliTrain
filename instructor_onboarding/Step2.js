import React from "react";
import clsx from "clsx";


const tagCss =
  "text-base font-normal px-4 py-[0.3rem] rounded-full border border-text";

const Step2 = ({ onBoardingData, action, SkilsList }) => {


  const checkAdded = (val) => {
    let experience = onBoardingData.experience;
    if (experience == val) {
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
              action(skil);
            }}
            className={clsx(tagCss, checkAdded(skil))}>
            {skil}
          </span>
        ))}
      </div>
    </>
  );
};

export default Step2;
