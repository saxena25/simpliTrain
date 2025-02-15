import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { CheckCircle } from '../../components/icons';

export async function authFinalLoader() {
  // await sleep();
  return {
    date: new Date().toISOString(),
  };
}


const AuthFinal = () => {
  const navigate = useNavigate();
  let data = useLoaderData();

  useEffect(()=>{
    setTimeout(() => {
        navigate('/onboarding');
    }, 2000);
  },[]);

  return (
    <div className='flex flex-col justify-center items-center gap-5 m-auto max-w-lg'>
        <CheckCircle />
        <h3 className='font-medium text-2xl text-text text-center'>Congratulations</h3>
        <p className='font-medium text-base text-text text-center'>Your profile has been successfully created. You can now access all the features and benefits available to simplitrain.</p>
    </div>
  );
}

export default AuthFinal;