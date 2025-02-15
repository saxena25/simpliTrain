import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import GoogleButton from '../../components/shared-components/GoogleButton';
import AppleButton from '../../components/shared-components/AppleButton';
import AuthFooter from '../../components/shared-components/AuthFooter';
import { Button, Divider, FloatingTextField, Spinner } from '../../components/ui-components';
import clsx from 'clsx'
import { XMarkIcon } from '@heroicons/react/24/outline';

const tagCss = 'text-base font-normal px-4 py-[0.3rem] rounded-full border border-text';

const Step4 = ({ onBoardingData, action, ageGroups, errors }) => {
  const navigate = useNavigate();
  const [personalData, setPersonalData] = useState(onBoardingData.personal_details);
  const checkGender = (val) => {
    let personal = {...personalData};
    if(personal.gender == val){
      return 'bg-primary text-white';
    }else{
      return 'bg-white text-text';
    }
  }

  const checkAge = (val) => {
    let personal = {...personalData};
    if(personal.age == val){
      return 'bg-primary text-white';
    }else{
      return 'bg-white text-text';
    }
  }

  const handleChange = (e) => {
    // console.log('e.target', );
    const value = e.target.value;
    const newObj = { ...personalData, full_name:value };
    setPersonalData({...newObj});
    action(newObj);
    e.target.autofocus = true;
  };

  const setGenderValue = (val) => {
    const newObj = { ...personalData, gender:val };
    setPersonalData({...newObj});
    action(newObj);
  }

  const setAgeValue = (val) => {
    const newObj = { ...personalData, age:val };
    setPersonalData({...newObj});
    action(newObj);
  }
  

  return (
    <div className='flex flex-col'>
      <div className='w-full mb-2'>
      {/* error={errors.username} */}
        <h6 className='text-text text-base font-medium mb-2'>Enter Your Full Name</h6>
        <FloatingTextField label="Full Name" type={'text'} name={"full_name"} onChange={handleChange} id={"full_name"} placeholder="Full Name" error={errors.name}  />
      </div>
      <div className='w-full mb-2'>
      {/* error={errors.username} */}
        <h6 className='text-text text-base font-medium mb-2'>Let us know your Gender</h6>
        <div className='flex flex-row flex-wrap items-center justify-start w-full py-5 gap-3'>
          {
            ['Male', 'Female', 'Non-Binary'].map((gender, index)=>(
              <span key={index} onClick={()=>{ setGenderValue(gender) }} className={clsx(tagCss, checkGender(gender))}>{gender}</span>
            ))
          }
        </div>
      </div>
      <div className='w-full mb-2'>
      {/* error={errors.username} */}
        <h6 className='text-text text-base font-medium mb-2'>Select your age group</h6>
        <div className='flex flex-row flex-wrap items-center justify-start w-full py-5 gap-3'>
          {
            ageGroups.map((age, index)=>(
              <span key={index} onClick={()=>{ setAgeValue(age) }} className={clsx(tagCss, checkAge(age))}>{age}</span>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Step4;