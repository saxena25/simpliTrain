import React, { useEffect, useState } from 'react';
import clsx from 'clsx'
import { CheckBox, UnCheckBox } from '../../components/icons';

const tagCss = ' flex flex-row gap-5 justify-start items-center rounded-2xl p-4 text-base font-medium rounded-4 cursor-pointer';

const Step2 = ({ onBoardingData, action, GoalsList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const checkAdded = (val) => {
    let immediate_goal = [...onBoardingData.immediate_goal];
    if(immediate_goal.includes(val)){
      return 'bg-primary text-white';
    }else{
      return 'bg-gray-6 text-text';
    }
  }

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:max-w-xl w-full max-w-md m-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {
        GoalsList.map((goal, index)=>(
          <div key={index} onClick={()=>{ action(goal?.id); }} className={clsx(tagCss, checkAdded(goal?.id))}>
            <span>
              {
                onBoardingData.immediate_goal.includes(goal.id)?
                <CheckBox />
                :<UnCheckBox />
              }
            </span>
            <span className='text-base font-medium' style={{lineHeight:"20px"}}>{goal?.name}</span>
          </div>
        ))
      }
    </div>
  );
}

export default Step2;