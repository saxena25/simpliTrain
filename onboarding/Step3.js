import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import GoogleButton from '../../components/shared-components/GoogleButton';
import AppleButton from '../../components/shared-components/AppleButton';
import AuthFooter from '../../components/shared-components/AuthFooter';
import { Button, Divider, Spinner } from '../../components/ui-components';
import clsx from 'clsx'
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckBox, UnCheckBox } from '../../components/icons';

const tagCss = ' flex flex-row gap-5 justify-start items-center rounded-2xl p-4 text-base font-medium rounded-4 cursor-pointer';

const Step3 = ({ onBoardingData, action, learningStylesList }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const checkAdded = (val) => {
    let learning_style = [...onBoardingData.learning_style];
    if(learning_style.includes(val)){
      return 'bg-primary text-white';
    }else{
      return 'bg-gray-6 text-text';
    }
  }

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-xl w-full grid grid-cols-1 gap-4">
      {
        learningStylesList.map((learningMode, index)=>(
          <div key={index} onClick={()=>{ action(learningMode.id); }} className={clsx(tagCss, checkAdded(learningMode.id))}>
            <span>
              {
                onBoardingData.learning_style.includes(learningMode.id)?
                <CheckBox />
                :<UnCheckBox />
              }
            </span>
            <span className='text-base font-medium' style={{lineHeight:"20px"}}>{learningMode.name}</span>
          </div>
        ))
      }
    </div>
  );
}

export default Step3;