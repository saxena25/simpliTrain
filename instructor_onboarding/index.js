import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Spinner } from '../../components/ui-components';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import store from '../../redux/store';
import { getInstructorOnboarding, updateInstructorOnboarding } from '../../redux/onboarding/actionCreator';
import { getExpertise } from '../../redux/master_data/actionCreator';
import { getItem } from '../../utils/localStorageControl';
import { Logo } from '../../components/shared-components/Logo';
import { getLearningModes } from '../../redux/learning_modes/actionCreator';
import { UpdateInstructorRole } from '../../redux/profile/actionCreator';

const getExpertiseList = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getExpertise());
    if(responce && responce.type == 'MASTER_DATA_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}

const addInstructorRole = (user) => {
  return new Promise(async(resolve, reject)=>{
    if(user && user.role.includes('INSTRUCTOR')){
      resolve([]);
    }else{
      const responce = await store.dispatch(UpdateInstructorRole({userId:user.id}));
      if(responce && responce.type == 'PROFILE_SUCCESS'){
        resolve(responce.data);
      }else{
        resolve([]);
      }
    }
  })
}

const getInstructorOnBoardingData = async(userID) => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getInstructorOnboarding({id:userID}));
    if(responce && responce.type == 'ON_BOARDING_SUCCESS'){
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


export const instructorOnBoardingLoader = async () => {
  const userID = getItem('simplitrain_user_id');
  const user = getItem('simplitrain_user');
  const expertise = await getExpertiseList();
  const learningModes = await getLearningModesList();
  const onBoardingData = await getInstructorOnBoardingData(userID);
  const instructorRole = await addInstructorRole(user);
  return {
    date: new Date().toISOString(),
    expertise:expertise,
    onBoardingData:onBoardingData,
    learningModes:learningModes,
    instructorRole:instructorRole
  };
}

const StepData = {
  step1:{
    title:'What is your area of expertise?',
    info:'Choose the areas where you excel the most. This helps us match you with learners who need your expertise.'
  },
  step2:{
    title:'How many years of experience do you have?',
    info:'Select the range that best reflects your professional experience. This helps us tailor opportunities and resources that align with your expertise level.'
  },
  step3:{
    title:'How ready are you to teach live classes?',
    info:'Share your current teaching experience and preparation level. This helps us tailor tools and support to make your live teaching sessions smooth and effective.'
  },
  step4:{
    title:'What type of course would you like to teach?',
    info:'Share your current teaching experience and preparation level. This helps us tailor tools and support to make your live teaching sessions smooth and effective.'
  },
  step5:{
    title:'Let\'s Personalize \n Your Learning Journey',
    info:''
  }
}


const InstructorOnBoarding = () => {
  const userID = getItem('simplitrain_user');
  const navigate = useNavigate();
  let loaderData = useLoaderData();
  console.log('loader Data', loaderData);
  const [formSubmit, setFormSubmit] = useState(false);  
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [onBoardingData, setOnBoardingData] = useState({
    skills:[],
    experience:[],
    immediate_goal: [],
    learning_style: [],
    personal_details:{
      full_name: '',
      gender: '',
      age: ''
    }
  }); 

  const experience = ["Less than 1 year" ,'1-3 years' ,'4-7 years' ,'8-12 years','12-20 years', '20+ years'];
  const GoalsList = ['I\'m a beginner','I have some knowledge','I\' am experienced'];
  const SkilsList = loaderData && loaderData.expertise?loaderData.expertise:[];
  const learningStylesList = loaderData && loaderData.learningModes?loaderData.learningModes:[];

  const addUpdateOnboarding = async(onBoardingReq) => {
    // onBoardingData
    const responce = await store.dispatch(updateInstructorOnboarding({id:userID, onboarding:onBoardingReq}));
    console.log(responce);
    if(responce && responce.type == 'ON_BOARDING_SUCCESS'){
      if(step == 5){
        navigate('/final/instructor_onboarding');
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

  const addRemoveActionExp = (val) => {
    // console.log('valval', val);
    // let experience = [...onBoardingData.experience];
    // if(experience.includes(val)){
    // const newArr = experience.filter(el => el != val);
    //   experience = newArr;
    // }else{
    //   experience.push(val);
    // }
    setOnBoardingData({
      ...onBoardingData,
      experience:val
    });
  }

  const addRemoveActionGoals = (val) => {
    // let immediate_goal = [...onBoardingData.immediate_goal];
    // // const checkExist = skills.indexOf(el=> el.lowercase() == val.lowercase());
    // if(immediate_goal.includes(val)){
    //   const newArr = immediate_goal.filter(el => el != val);
    //   immediate_goal = newArr;
    // }else{
    //   immediate_goal.push(val);
    // }
    setOnBoardingData({
      ...onBoardingData,
      immediate_goal:val
    });
  }

  const addRemoveActionLearningStyles = (val) => {
    let learning_style = [...onBoardingData.learning_style];
  
    if (learning_style.includes(val)) {
      // Remove the style if it exists
      learning_style = learning_style.filter((el) => el !== val);
    } else {
      // Add the style if it does not exist
      learning_style.push(val);
    }
  
    setOnBoardingData({
      ...onBoardingData,
      learning_style,
    });
  };

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
      setStep(5);
    }
  }

  const FinalStepSubmit = () => {
    // e.preventDefault();
    setErrors({});  
    const newErrors = {};
    console.log('onBoardingData', onBoardingData);
    if(onBoardingData && onBoardingData.personal_details && onBoardingData.personal_details.full_name){
      if(onBoardingData && onBoardingData.skills.length>0 && onBoardingData.experience && onBoardingData.immediate_goal && onBoardingData.learning_style.length>0){
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
            <span className={`w-9 md:w-14 h-1 md:h-[2px] bg-gray-4 ${step >= 5?'bg-primary':''}`}></span>
          </p>  
        </div>
        <div className='flex justify-end pr-4 md:p-0'>
          {
            step < 5?
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
              {/* {
                step == 1?
                  <Step1 SkilsList={SkilsList} onBoardingData={onBoardingData} action={addRemoveActionSkills} />
                :step == 2?
                <Step2 GoalsList={GoalsList} onBoardingData={onBoardingData} action={addRemoveActionGoals} />
                :step == 3?
                <Step3 learningStylesList={learningStylesList} onBoardingData={onBoardingData} action={addRemoveActionLearningStyles} />
                :step == 4?
                <Step4 ageGroups={ageGroups} onBoardingData={onBoardingData} action={addRemoveActionData} errors={errors} />
                :null
              }  */}
              {
                step == 1?
                  <Step1 SkilsList={SkilsList} onBoardingData={onBoardingData} action={addRemoveActionSkills} />
                :step == 2?
                <Step2 SkilsList={experience} onBoardingData={onBoardingData} action={addRemoveActionExp} />
                :step == 3?
                <Step3 GoalsList={GoalsList} onBoardingData={onBoardingData} action={addRemoveActionGoals} />
                :step == 4?
                <Step4 learningStylesList={learningStylesList} onBoardingData={onBoardingData} action={addRemoveActionLearningStyles} />
                :step == 5?
                <Step5 onBoardingData={onBoardingData} action={addRemoveActionData} errors={errors} />
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
                step < 5?
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

export default InstructorOnBoarding;