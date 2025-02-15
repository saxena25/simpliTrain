import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'
import { CheckBox, UnCheckBox } from '../../components/icons';

const tagCss = ' flex flex-row h-20 gap-5 justify-start items-center bg-gray-200 rounded-2xl p-4 text-base font-medium rounded-4';

const Step3 = ({ onBoardingData, action, GoalsList }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const checkAdded = (val) => {
    let immediate_goal = onBoardingData.immediate_goal;
    if(immediate_goal == val){
      return 'bg-primary text-white';
    }else{
      return 'bg-gray-6 text-text';
    }
  }

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div class="md:max-w-lg w-full max-w-md m-auto grid grid-cols-1 md:grid-cols-1 gap-4">
      {
        GoalsList.map((goal, index)=>(
          <div key={index} onClick={()=>{ action(goal); }} className={clsx(tagCss, checkAdded(goal))}>
            <span>
              {
                onBoardingData.immediate_goal.includes(goal)?
                <CheckBox />
                :<UnCheckBox />
              }
            </span>
            <span className='text-base font-medium' style={{lineHeight:"20px"}}>{goal}</span>
          </div>
        ))
      }
    </div>
  );
}

export default Step3;