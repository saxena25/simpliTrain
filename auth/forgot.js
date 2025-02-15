import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
// import { Button, Divider, Form, FormProps, Input, Select, Space } from 'antd';
import { useDispatch } from 'react-redux';
// import { useForm } from "react-hook-form";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { UpdatePassword } from '../../redux/authentication/actionCreator';
import { BackArrow, CircleOutlineIcon } from '../../components/icons';
import { Button, Divider, TextField, FloatingTextField, Spinner } from '../../components/ui-components';

// CheckCircleIcon   XMarkIcon XCircleIcon 
export async function setNewPasswordLoader() {
  // await sleep();
  return {
    date: new Date().toISOString(),
  };
}
  
const SetNewPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: '',
  });
  const [passwordRules, setPasswordRules] = useState({
    strength: null,
    name: null,
    minleangth: null,
    number_symbol: null
  });
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);  
  let data = useLoaderData();

  const validate = () => {
    const newErrors = {};
    // Password validation
    if (!formData.password) {
        newErrors.password = 'Please enter your password.';
    }
    // console.log('passwordRules', passwordRules);
    // Password validation
    if (!passwordRules.strength) {
      newErrors.strength = true;
    }
    if (!passwordRules.name) {
      newErrors.name = true;
    }
    if (!passwordRules.minleangth) {
      newErrors.minleangth = true;
    }
    if (!passwordRules.number_symbol) {
      newErrors.number_symbol = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const onFinish = async (e) => {
    e.preventDefault();
    console.log('sasasasaasass');
    setFormSubmit(true);
    if (validate()) {
        const newErrors = {};
        // alert('Form submitted successfully!');
        console.log(formData);

        // formData['type'] = inputType;
        let reponse = await dispatch(UpdatePassword(formData));
        console.log('reponse', reponse);
        if(reponse && reponse.type === "AUTH_SUCCESS"){
          // onBoarding
          if(reponse.data.onBoarding){
            navigate('/');
          }else{
            navigate('/onboarding');              
          }           
        }else if(reponse && reponse.type === "AUTH_ERR"){
          newErrors.password = reponse.err;
        }else{
          newErrors.password = 'Something wenet wrong!!!';
        }
        setErrors(newErrors);
        setFormSubmit(false);
    }else{
      setFormSubmit(false);
    }
  };

  const passwordRulesCheck = (password) => {
    const lengthRule = password.length >= 8;
    const uppercaseRule = /[A-Z]/.test(password);
    const lowercaseRule = /[a-z]/.test(password);
    const numberRule = /\d/.test(password);
    const specialCharRule = /[!@#$%^&*]/.test(password);
    setPasswordRules({
      strength: uppercaseRule && lowercaseRule,
      name: uppercaseRule && lowercaseRule,
      minleangth: lengthRule,
      number_symbol: numberRule && specialCharRule
    });
  }

  const handleChange = (e) => {
    // console.log('e.target', );
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    passwordRulesCheck(value);
    e.target.autofocus = true;
  };

  return (
    <div className='flex flex-col justify-start items-start gap-4'>
      <h3 className='text-2xl text-text text-left w-full font-medium'>{'Set your password'}</h3>
      <p className="text-base text-text text-left w-full">Your OTP has been verified. Now, please set your password to get started on SimpliTrain.</p>
      <form  onSubmit={onFinish} method="POST" className="w-full">
        <FloatingTextField label="Set Password" type={'password'} name={"password"} id={"password"} onChange={handleChange} placeholder="Set Password" error={errors.password} />
        <ul className='flex flex-col items-start justify-start w-full m-0 my-5 p-1'>
          <li className='flex flex-row justify-start items-center gap-2'>
            <span>{passwordRules.strength?<CheckCircleIcon className='w-5' />:errors && errors.strength?<XCircleIcon className='text-error-text w-5' />:<CircleOutlineIcon className='w-5' />}</span>
            <span className={`${passwordRules.strength?'text-text':errors && errors.strength?'text-error-text':'text-text'}`}>Password strength: weak</span>
          </li>
          <li className='flex flex-row justify-start items-center gap-2'>
            <span>{passwordRules.name?<CheckCircleIcon className='w-5' />:errors && errors.name?<XCircleIcon className='text-error-text w-5' />:<CircleOutlineIcon className='w-5' />}</span>
            <span className={`${passwordRules.name?'text-text':errors && errors.name?'text-error-text':'text-text'}`}>Can't contain your name or email address</span>
          </li>
          <li className='flex flex-row justify-start items-center gap-2'>
            <span>{passwordRules.minleangth?<CheckCircleIcon className='w-5' />:errors && errors.minleangth?<XCircleIcon className='text-error-text w-5' />:<CircleOutlineIcon className='w-5' />}</span>
            <span className={`${passwordRules.minleangth?'text-text':errors && errors.minleangth?'text-error-text':'text-text'}`}>At least 8 characters</span>
          </li>
          <li className='flex flex-row justify-start items-center gap-2'>
            <span>{passwordRules.number_symbol?<CheckCircleIcon className='w-5' />:errors && errors.number_symbol?<XCircleIcon className='text-error-text w-5' />:<CircleOutlineIcon className='w-5' />}</span>
            <span className={`${passwordRules.number_symbol?'text-text':errors && errors.number_symbol?'text-error-text':'text-text'}`}>Contains a number or symbol</span>
          </li>
        </ul>
        <Button type='submit' color='primary' variant='solid' className={formSubmit?'w-20':'w-full'} rounded={formSubmit?true:false}>{formSubmit?<Spinner className={''} color={'white'} />:'Save & Continue'}</Button>
      </form>
    </div>
  )
}

export default SetNewPassword;