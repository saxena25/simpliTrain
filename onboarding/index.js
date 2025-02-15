import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import GoogleButton from '../../components/shared-components/GoogleButton';
import AppleButton from '../../components/shared-components/AppleButton';
import AuthFooter from '../../components/shared-components/AuthFooter';
import { Button, Divider, Spinner } from '../../components/ui-components';
import clsx from 'clsx'
import { XMarkIcon } from '@heroicons/react/24/outline';
import Step1 from './Step1';
import Step4 from './Step4';
import Step3 from './Step3';
import Step2 from './Step2';
import { useDispatch } from 'react-redux';
import { getUserOnboarding, updateUserOnboarding } from '../../redux/onboarding/actionCreator';
import { getItem } from '../../utils/localStorageControl';
import { getSkills } from '../../redux/skills/actionCreator';
import store from '../../redux/store';
import { getGoals } from '../../redux/goals/actionCreator';
import { getLearningModes } from '../../redux/learning_modes/actionCreator';
import { Logo } from '../../components/shared-components/Logo';

const tagCss = 'text-base font-normal px-4 py-[0.3rem] rounded-full border border-text';


const getSkillsList = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getSkills());
    if(responce && responce.type == 'SKILLS_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}

const getGoalsList = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getGoals());
    if(responce && responce.type == 'GOALS_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}

const getLearningModesList = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getLearningModes());
    if(responce && responce.type == 'LEARNINGMODES_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}

const getOnBoardingData = async(userID) => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getUserOnboarding({id:userID}));
    if(responce && responce.type == 'ON_BOARDING_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}

export const OnBoardingLoader = async () => {
  const userID = getItem('simplitrain_user_id');
  const skills = await getSkillsList();
  const goals = await getGoalsList();
  const learningModes = await getLearningModesList();
  const onBoardingData = await getOnBoardingData(userID);

  
  return {
    date: new Date().toISOString(),
    skills: skills,
    onBoardingData:onBoardingData,
    goals:goals,
    learningModes:learningModes
  };
}

const StepData = {
  step1:{
    title:'What would you like to learn?',
    info:'Pick the skills or areas you\'d like to explore'
  },
  step2:{
    title:'What is your immediate goal?',
    info:'Select your current focus to personalize your journey'
  },
  step3:{
    title:'What is your preferred learning style?',
    info:'Choose how you\'d prefer to engage with your learning'
  },
  step4:{
    title:'Let\'s Personalize \n Your Learning Journey',
    info:''
  }
}


const OnBoarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = getItem('simplitrain_user');
  let loaderData = useLoaderData();
  console.log('loader Data', loaderData.onBoardingData);
  const [formSubmit, setFormSubmit] = useState(false);  
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  // .map(el=>el.id)
  const [onBoardingData, setOnBoardingData] = useState({
    skills: loaderData.onBoardingData && loaderData.onBoardingData.skills?loaderData.onBoardingData.skills.map(el=> el.skillId):[],
    immediate_goal: loaderData.onBoardingData && loaderData.onBoardingData.goals?loaderData.onBoardingData.goals.map(el=>el.goalId):[],
    learning_style: loaderData.onBoardingData && loaderData.onBoardingData.learning_style?loaderData.onBoardingData.learning_style:[],
    personal_details:{
      full_name: loaderData.onBoardingData && loaderData.onBoardingData.name?loaderData.onBoardingData.name:'',
      gender: loaderData.onBoardingData && loaderData.onBoardingData.gender?loaderData.onBoardingData.gender:'',
      age: loaderData.onBoardingData && loaderData.onBoardingData.age_limit?loaderData.onBoardingData.age_limit:''
    }
  }); 
  const SkilsList = loaderData && loaderData.skills?loaderData.skills:[];
  const GoalsList = loaderData && loaderData.goals?loaderData.goals:[];
  const learningStylesList = loaderData && loaderData.learningModes?loaderData.learningModes:[];
  const ageGroups = ['<20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', '>61'];
  
  const addUpdateOnboarding = async(onBoardingReq) => {
    // onBoardingData
    const responce = await store.dispatch(updateUserOnboarding({id:userID, onboarding:onBoardingReq}));
    console.log(responce);
    if(responce && responce.type == 'ON_BOARDING_SUCCESS'){
      if(step == 4){
        navigate('/final/onboarding');
      }
    }else{
      // resolve([]);
    }
  }


  const addRemoveActionSkills = (val) => {
    let skills = [...onBoardingData.skills];
    // const checkExist = skills.indexOf(el=> el.lowercase() == val.lowercase());
    if(skills.includes(val)){
      const newArr = skills.filter(el => el != val);
      skills = newArr;
    }else{
      skills.push(val);
    }
    setOnBoardingData({
      ...onBoardingData,
      skills:[...skills]
    });
  }

  const addRemoveActionGoals = (val) => {
    let immediate_goal = [...onBoardingData.immediate_goal];
    // const checkExist = skills.indexOf(el=> el.lowercase() == val.lowercase());
    if(immediate_goal.includes(val)){
      const newArr = immediate_goal.filter(el => el != val);
      immediate_goal = newArr;
    }else{
      immediate_goal.push(val);
    }
    setOnBoardingData({
      ...onBoardingData,
      immediate_goal:[...immediate_goal]
    });
  }

  const addRemoveActionLearningStyles = (val) => {
    let learning_style = [...onBoardingData.learning_style];
    // const checkExist = skills.indexOf(el=> el.lowercase() == val.lowercase());
    if(learning_style.includes(val)){
      const newArr = learning_style.filter(el => el != val);
      learning_style = newArr;
    }else{
      learning_style.push(val);
    }
    setOnBoardingData({
      ...onBoardingData,
      learning_style:[...learning_style]
    });
  }

  const addRemoveActionData = (Obj) => {
    // console.log('Obj', Obj);
    setOnBoardingData({
      ...onBoardingData,
      personal_details:{...Obj}
    });
  }

  const stepChange = (st) => {
    if(st == 1){
      addUpdateOnboarding({...onBoardingData, status:'PENDING'});
    }
    setStep(Number(step)+Number(st));
  }

  const skipButton = () => {
    if(onBoardingData && onBoardingData.personal_details && onBoardingData.personal_details.full_name){
      navigate('/');
    }else{
      setStep(4);
    }
  }

  const FinalStepSubmit = () => {
    // e.preventDefault();
    setErrors({});  
    const newErrors = {};
    console.log('onBoardingData', onBoardingData);
    if(onBoardingData && onBoardingData.personal_details && onBoardingData.personal_details.full_name){
      if(onBoardingData && onBoardingData.skills.length>0 && onBoardingData.immediate_goal.length>0 && onBoardingData.learning_style.length>0){
        addUpdateOnboarding({...onBoardingData, status:'COMPLETED', type:'SUBMIT'});
      }else{
        addUpdateOnboarding({...onBoardingData, status:'PENDING'});
      }
    }else{
      newErrors.name = 'Full Name is Required!';
      setErrors(newErrors);  
    }
  }

  return (
      <div className='flex flex-col gap-0 w-full h-full md:p-10 py-10 px-2'>
        <div className='flex items-center justify-between '>
          <div className='justify-start hidden md:flex'>
            <Link to={'/'}><Logo /></Link>
          </div>
          <div className='flex justify-center'>
            <p className='flex flex-row justify-center items-center gap-2'>
              <span className={`w-9 md:w-14 h-1 md:h-[2px] bg-gray-4 ${step >= 1?'bg-primary':''}`}></span>
              <span className={`w-9 md:w-14 h-1 md:h-[2px] bg-gray-4 ${step >= 2?'bg-primary':''}`}></span>
              <span className={`w-9 md:w-14 h-1 md:h-[2px] bg-gray-4 ${step >= 3?'bg-primary':''}`}></span>
              <span className={`w-9 md:w-14 h-1 md:h-[2px] bg-gray-4 ${step >= 4?'bg-primary':''}`}></span>
            </p>  
          </div>
          <div className='flex justify-end pr-4 md:p-0'>
            {
              step < 4?
              <Button onClick={()=> skipButton() } type="link" color='text' className={'font-medium'}>{'SKIP'}</Button>
              :null
            }
          </div>
        </div>
        <div className='flex w-full h-full justify-center items-center p-5'>
          {/* <div className='relative w-full md:w-fit h-full flex flex-col'> */}
            <div className='flex flex-col h-full justify-between items-center gap-2 md:p-10 md:pt-16 pt-5'>
              <div className='flex flex-col justify-center items-center text-center'>
                <h3 className='text-2xl text-text font-medium '>{StepData[`step${step}`].title}</h3>
                <p className='text-base text-text font-normal'>{StepData[`step${step}`].info}</p>
              </div>
              <div className='flex flex-row w-full'>
                {
                  step == 1?
                    <Step1 SkilsList={SkilsList} onBoardingData={onBoardingData} action={addRemoveActionSkills} />
                  :step == 2?
                  <Step2 GoalsList={GoalsList} onBoardingData={onBoardingData} action={addRemoveActionGoals} />
                  :step == 3?
                  <Step3 learningStylesList={learningStylesList} onBoardingData={onBoardingData} action={addRemoveActionLearningStyles} />
                  :step == 4?
                  <Step4 ageGroups={ageGroups} onBoardingData={onBoardingData} action={addRemoveActionData} errors={errors} />
                  :null
                } 
              </div>
              <div className='flex flex-row justify-center items-center gap-3'>
                {
                  step > 1 ?
                    <Button onClick={()=> stepChange(-1)} type='button' size="sm" color='primary' variant='outline' className={formSubmit?'w-20 py-3':'w-32 px-14 py-3'} rounded={formSubmit?true:false}>{formSubmit?<Spinner className={''} color={'white'} />:'PREVIOUS'}</Button>
                  :null
                }
                {
                  step < 4?
                    <Button onClick={()=> stepChange(1)} type='button' size="sm" color='primary' variant='solid' className={formSubmit?'w-20 py-3':'w-32 px-14 py-3'} rounded={formSubmit?true:false}>{formSubmit?<Spinner className={''} color={'white'} />:'NEXT'}</Button>
                  :<Button onClick={()=> FinalStepSubmit()} type='button' size="sm" color='primary' variant='solid' className={formSubmit?'w-20 py-3':'w-32 px-14 py-3'} rounded={formSubmit?true:false}>{formSubmit?<Spinner className={''} color={'white'} />:'Submit'}</Button>
                }

              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
  );
}

export default OnBoarding;