import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'
import { CheckBox, UnCheckBox } from '../../components/icons';

const tagCss = 'flex flex-row gap-5 justify-start h-20 items-center rounded-2xl p-4 text-base font-medium rounded-4';
const Step4 = ({ onBoardingData, action, learningStylesList }) => {


  
  const checkAdded = (val) => {
    return onBoardingData.learning_style.includes(val) ? 'bg-primary text-white' : 'bg-gray-6 text-text';
  };

  return (
    <div className="md:max-w-lg w-full max-w-md m-auto grid grid-cols-1 md:grid-cols-1 gap-4">
      {learningStylesList.map((goal, index) => (
        <div
          key={index}
          onClick={() => {
            action(goal.id); // Pass the `style` property directly
          }}
          className={clsx(tagCss, checkAdded(goal.id))}
        >
          <span>
            {onBoardingData.learning_style.includes(goal.id) ? <CheckBox /> : <UnCheckBox />}
          </span>
          <div className="flex flex-col justify-center items-start">
            <span className="text-base font-medium" style={{ lineHeight: "20px" }}>{goal.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step4;