import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { CheckCircle } from '../../components/icons';
import { Button, Spinner } from '../../components/ui-components';
import store from '../../redux/store';
import { getProfile } from '../../redux/profile/actionCreator';

const getMyProfile = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getProfile());
    if(responce && responce.type == 'PROFILE_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}

export async function onBoardingFinalLoader() {
  // await sleep();
  const profile = await getMyProfile();
  return {
    date: new Date().toISOString(),
    profile: profile,
  };
}


const OnBoardingFinal = () => {
  const navigate = useNavigate();
  let loadingdata = useLoaderData();

  console.log('data', loadingdata.profile);
  const LetsGo = () => {
    navigate('/dashboard');
  }
  // useEffect(()=>{
  //   setTimeout(() => {
  //       navigate('/onboarding');
  //   }, 2000);
  // },[]);

  return (
    <div className='flex flex-col justify-center items-center gap-5 m-auto max-w-lg'>
        <CheckCircle />
        <h3 className='font-medium text-2xl text-text text-center'>Success! You’re All Set</h3>
        <p className='font-medium text-base text-text text-center'> You can now explore your dashboard and get started with SimpliTrain. We’re excited to have you onboard!</p>
        <Button onClick={()=> LetsGo()} type='button' size="sm" color='primary' variant='solid' className={'w-48 px-14 py-3'} >{'Lets Go!'}</Button>
    </div>
  );
}

export default OnBoardingFinal;