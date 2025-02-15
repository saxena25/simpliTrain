import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
// import { Button, Divider, Form, FormProps, Input, Select, Space } from 'antd';
import AuthFooter from '../../components/shared-components/AuthFooter';
import { BackArrow, EditPencil } from '../../components/icons';
import { Button, PincodeField, Spinner } from '../../components/ui-components';
import { resentOtp, verifyOTP } from '../../redux/authentication/actionCreator';
import { useDispatch } from 'react-redux';
import { getItem } from '../../utils/localStorageControl';

export async function verificationLoader() {
  // await sleep();
  return {
    date: new Date().toISOString(),
  };
}
  
const Verification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [resend, setResend] = useState(false);
  const [counter, setCounter] = useState(30);
  const [inputType, setInputType] = useState('text'); // Initial type is email
  const [newUser, setNewUser] = useState(false);
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [formData, setFormData] = useState({
    pincode: '',
  });
  
  let data = useLoaderData();
  // const [signform] = Form.useForm();

  
  const validate = () => {
    const newErrors = {};
    // Pincode validation
    console.log(formData.pincode);
    const phoneFormat = /^[0-9]{6}$/;
    if (!formData.pincode) {
      // console.log('sasasasasasadsgedfhfhfdgg', formData.pincode);
      newErrors.pincode = 'Please enter the verification code.';
    }else if (formData.pincode.length < 6 || formData.pincode.length > 6) {
      newErrors.pincode = 'The code must be 6 digits.';
    }else if (!phoneFormat.test(formData.pincode)) {
      newErrors.pincode = 'Please enter only numbers.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const onFinish = async (e) => {
    e.preventDefault();
    setFormSubmit(true);
    if (validate()) {
        const newErrors = {};
        // console.log(formData, inputType);
        formData['type'] = inputType;
        formData['email'] = username;
        let reponse = await dispatch(verifyOTP(formData));
        // console.log('reponse', reponse);
        if(reponse && reponse.type === "AUTH_SUCCESS"){
          // onBoarding
          if(newUser){
            navigate('/auth/setpassword');
          }else if(inputType == 'emailotp'){
            navigate('/auth/forgot');
          }else{
            if(reponse.data.password){
              navigate('/auth/onboarding');
            }else{
              navigate('/');
            }
          }            
        }else if(reponse && reponse.type === "AUTH_ERR"){
          newErrors.pincode = reponse.err;
        }else{
          newErrors.pincode = 'Something wenet wrong!!!';
        }
        setErrors(newErrors);
        setFormSubmit(false);          
    }else{
      setFormSubmit(false);
    }
  };

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000); // Countdown every second
    } else {
      setResend(true);
    }
    return () => clearTimeout(timer); // Cleanup the timer
  }, [counter]);

  const handleChange = (value) => {
    // console.log('e.target', );
    // const value = e.target.value;
    console.log(value);
    setFormData({ ...formData, pincode: value })
    // e.target.autofocus = true;
  };

  const resendOTP = async() => {
    let reponse = await dispatch(resentOtp({email:username}));
    if(reponse && reponse.type === "AUTH_SUCCESS"){
        setResend(true);      
        setCounter(30);
    }else if(reponse && reponse.type === "AUTH_ERR"){
    }else{
     }
  }

  useEffect(()=>{
    // getItem('simplitrain_token');
    if(location && location.state){
      // console.log('location.state', location.state);
      setUsername(location.state.username);
      setInputType(location.state.type);
      setNewUser(location.state.new_user);
    }else{
      navigate('/auth/signin');
    }
  },[]);


  return (
    <div className='flex flex-col justify-start items-start gap-4'>
      <h3 className='text-2xl text-text text-left w-full font-medium'>{'Verification Code'}</h3>
      <p className="text-base text-text text-left w-full">We've sent a six-digit code for verification to your following mobile number. Kindly enter the code below</p>
      <p className='flex flex-row justify-start items-center gap-2'>{username} 
        <a href="/auth/signin" color='text' className={'p-0'}>{<EditPencil />}</a>
      </p>
      <form  onSubmit={onFinish} method="POST" className="w-full">
        {/* <FloatingTextField label="Password" type={'password'} name={"password"} id={"password"} placeholder="Password" error={errors.password} /> */}
        <PincodeField label="" type={'tel'} name={"pincode"} id={"pincode"} placeholder="Pincode" onChange={handleChange} error={errors.pincode} />
        <div className='flex flex-row items-center justify-between w-full py-4 m-0 mb-3'>
          <button onClick={()=> resendOTP() } disabled={!resend} type={'button'} color='text' className={'font-medium p-0 border-0 underline'}>{'Resend'}</button>
          <span>{counter}</span>
        </div>
        <Button type='submit' color='primary' variant='solid' className={formSubmit?'w-20':'w-full'} rounded={formSubmit?true:false}>{formSubmit?<Spinner className={''} color={'white'} />:'Confirm'}</Button>
      </form>
    </div>
  );
}

export default Verification;