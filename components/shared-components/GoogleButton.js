import React, { useEffect, useState } from "react";
import { GoogleIcon } from "../icons";
import { Button } from "../ui-components";
import { GoogleLogin } from 'react-google-login';
import { GoogleLoginMethod } from "../../redux/authentication/actionCreator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { redirectAfterLogin } from "../../utils/helpers";

// type Props = {
//     action:any,
//     loading:string,
// };

const GoogleButton=  () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginHistory, setLoginHistory] = useState([]);
  const [focus, setFocus] = useState(false);
  const clientId = '868458006264-kl5hlauf5bkmlp6rjsq2hg221e3m3bqs.apps.googleusercontent.com';

  const onSuccess = async (response) => {
    // console.log('Login Success:', response.profileObj);
    // alert(`Welcome, ${response.profileObj.name}`);
    setLoginHistory((prevHistory) => [response.profileObj, ...prevHistory.slice(0, 4)]);
    const formData = {
      first_name:response.profileObj.givenName,
      last_name:response.profileObj.familyName,
      email:response.profileObj.email
    };  
    let reponse = await dispatch(GoogleLoginMethod(formData));
    console.log('reponse', reponse);
    if(reponse && reponse.type === "AUTH_SUCCESS"){
      const path = await redirectAfterLogin(reponse.data);
      console.log('path', path);
      navigate(path);
    }else if(reponse && reponse.type === "AUTH_ERROR"){
      // newErrors.username = reponse.err;
    }
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
    alert('Failed to log in. Please try again.');
  };

  useEffect(()=>{
    if(loginHistory.length>0){
      localStorage.setItem('loginHistorySimplitrain', JSON.stringify(loginHistory));
    }
  },[loginHistory]);

  return (
    <GoogleLogin
      clientId={clientId}
      render={(renderProps) => (
        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-button" type='button' icon={<GoogleIcon />} >Google</Button> 
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />


    // <GoogleOAuthProvider clientId={clientId}>
    //   
    // </GoogleOAuthProvider>

  );
};

export default GoogleButton;
