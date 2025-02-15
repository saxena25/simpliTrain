import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
// import { Button, Divider, Form, FormProps, Input, Select, Space } from 'antd';
import { useDispatch } from 'react-redux';
// import { useForm } from "react-hook-form";
import { checkUser, checkUserType, ForgotPassword, SetverifyPassword } from '../../redux/authentication/actionCreator';
import GoogleButton from '../../components/shared-components/GoogleButton';
import AppleButton from '../../components/shared-components/AppleButton';
import AuthFooter from '../../components/shared-components/AuthFooter';
import { BackArrow } from '../../components/icons';
import { Button, Divider, TextField, FloatingTextField, Spinner } from '../../components/ui-components';
import { redirectAfterLogin } from '../../utils/helpers';


export async function passwordLoader() {
  // await sleep();
  return {
    date: new Date().toISOString(),
  };
}
  
const Password = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const { register, handleSubmit, formState: { errors } } = useForm();
  const [username, setUsername] = useState('');
  const [newUser, setNewUser] = useState(false);
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const onFinish = async (e) => {
    const newErrors = {};
    e.preventDefault();
    setFormSubmit(true);
    if (validate()) {
        let reponse = await dispatch(SetverifyPassword({...formData, newUser:newUser}));
        console.log('reponse', reponse);
        if(reponse && reponse.type === "AUTH_SUCCESS"){
          // onBoarding
          const path = await redirectAfterLogin(reponse.data);
          navigate(path);       
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

  const handleChange = (e) => {
    // console.log('e.target', );
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    // passwordRulesCheck(value);
    e.target.autofocus = true;
  };

  const sendForgotOTP = async() => {
    let reponse = await dispatch(ForgotPassword({email:username}));
    console.log('reponse', reponse);
    if(reponse && reponse.type === "AUTH_SUCCESS"){
      navigate('/auth/verification', {state:{username:username,type:'emailotp', new_user:newUser}})         
    }else{

    }
  }




  useEffect(()=>{
    if(location && location.state){
      // console.log('location.state', location.state);
      setUsername(location.state.username);
      setNewUser(location.state.new_user);
    }else{
      navigate('/auth/signin');
    }
  },[]);

  return (
    <div className='flex flex-col justify-start items-start gap-4'>
      <h3 className='text-2xl text-text text-left w-full font-medium'>{'Enter Password'}</h3>
      <p className="text-base text-text text-left w-full">Your OTP has been verified. Now, please set your password to get started on SimpliTrain.</p>
      <form  onSubmit={onFinish} method="POST" className="w-full">
        <FloatingTextField label="Password" type={'password'} name={"password"} id={"password"} onChange={handleChange} placeholder="Password" error={errors.password} />
        <p className='flex flex-row items-center justify-end w-full m-0 mb-3'>
          <a onClick={()=> sendForgotOTP()} color='text' className={'font-medium underline cursor-pointer'}>{'Forgot Password ?'}</a>
        </p>
        <Button type='submit' color='primary' variant='solid' className={formSubmit?'w-20':'w-full'} rounded={formSubmit?true:false}>{formSubmit?<Spinner className={''} color={'white'} />:'Sign In'}</Button>
      </form>
        <p className='flex flex-row items-center justify-start w-full m-0 mb-3'>
          <a href="/auth/signin" color='text' className={'font-medium underline'}>{'Want to use another Email ID?'}</a>
        </p>
    </div>
  );
}

export default Password;