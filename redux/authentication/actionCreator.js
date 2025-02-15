// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from "../../dataService/dataService";
import actiontyps from "./actionsTypes";
import profileactiontyps from "../profile/actionsTypes";
import { removeItem, setItem } from "../../utils/localStorageControl";
const { AUTH_BEGIN, AUTH_SUCCESS, AUTH_ERR } = actiontyps;
const { PROFILE_SUCCESS } = profileactiontyps;

const setUserRole = (role) =>({
  type: "SET_USER_ROLE",
  payload: role
})

const checkUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_BEGIN });
      let postData = {};
      if (data.type == "email") {
        postData = {
          email: data.username,
          type: data.type, // phone
          role: data.role, //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
        };
      } else {
        postData = {
          phone: data.username,
          countryCode: data.phone_code,
          type: data.type, // phone
          role: data.role, //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
        };
      }
      console.log("CheckUser :", postData);
      let response = await DataService.post("user/check", postData);
      // console.log('responseresponse', response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        // console.log('response.data.data.token', response.data.data.token);
        setItem("simplitrain_token", response.data.data.token, true);
        // setItem('simplitrain_user', response.data.data);
        // setItem('simplitrain_user_id', response.data.data.id);
        return dispatch({
          type: AUTH_SUCCESS,
          data: { ...response.data.data, newUser: response.data.create },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: AUTH_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: AUTH_ERR, err: err });
    }
  };
};

const verifyOTP = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_BEGIN });
      const OTPTYPE = data.type;
      let endType = "verify";
      let postData = {
        otp: data.pincode,
      };
      // console.log("redux verifyOtp: & pincode", OTPTYPE, postData);
      if (OTPTYPE == "emailotp") {
        postData["email"] = data.email;
        endType = "verfiy";
      }
      let response = await DataService.post(
        `user/${endType}/${OTPTYPE}`,
        postData
      );
      console.log("responseresponse", response);
      if (await response.data.success) {
        if (response.data.data.token) {
          setItem("simplitrain_token", response.data.data.token, true);
        }
        setItem("simplitrain_user", response.data.data);
        setItem("simplitrain_user_id", response.data.data.id);
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: AUTH_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: AUTH_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: AUTH_ERR, err: err });
    }
  };
};

const resentOtp = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_BEGIN });
      console.log("Redux Email: ", data.email);
      let postData = {
        email: data.email,
      };
      let response = await DataService.post(`user/resent/otp`, postData);
      // console.log('responseresponse', response);
      if (await response.data.success) {
        return dispatch({
          type: AUTH_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: AUTH_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: AUTH_ERR, err: err });
    }
  };
};

const ForgotPassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_BEGIN });
      let postData = {
        email: data.email,
      };
      let response = await DataService.post(`user/forgot/password`, postData);
      // console.log('responseresponse', response);
      if (await response.data.success) {
        return dispatch({
          type: AUTH_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        return dispatch({ type: AUTH_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERR, err: err });
    }
  };
};

const SetverifyPassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_BEGIN });
      let postData = {
        password: data.password,
      };
      console.log("redux password: ", postData);
      let response = await DataService.post(`user/match/password`, postData);
      console.log("Password Matched", response);
      if (await response.data.success) {
        setItem("simplitrain_token", response.data.data.token, true);
        setItem("simplitrain_user", response.data.data);
        setItem("simplitrain_user_id", response.data.data.id);
        // message.success({ content:  response.data.message, duration: 2 });
        // dispatch({ type: PROFILE_SUCCESS, data:{...response.data.data}});
        return dispatch({
          type: AUTH_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: AUTH_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: AUTH_ERR, err: err });
    }
  };
};

const UpdatePassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_BEGIN });
      let postData = {
        password: data.password,
      };
      let response = await DataService.post(`user/update/password`, postData);
      console.log("responseresponse", response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: AUTH_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: AUTH_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: AUTH_ERR, err: err });
    }
  };
};

const GoogleLoginMethod = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_BEGIN });
      let postData = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        role: "LEARNER",
      };
      let response = await DataService.post(`user/google/login`, postData);
      console.log("responseresponse", response);
      if (await response.data.success) {
        setItem("simplitrain_token", response.data.user.token, true);
        setItem("simplitrain_user", response.data.user);
        setItem("simplitrain_user_id", response.data.user.id);
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: AUTH_SUCCESS,
          data: { ...response.data.user },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: AUTH_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: AUTH_ERR, err: err });
    }
  };
};

const LogoutUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_BEGIN });
      removeItem("simplitrain_token", true);
      removeItem("simplitrain_user");
      removeItem("simplitrain_user_id");
      return dispatch({
        type: AUTH_SUCCESS,
        data: {
          logout: true,
        },
      });
    } catch (err) {
      dispatch({ type: AUTH_ERR, err: err });
    }
  };
};

const verifyEmail = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_BEGIN });
      let postData = {
        email: data.email,
        otp: data.pincode,
      };
      // console.log("")
      let response = await DataService.post(`user/verify/emailotp`, postData);
      console.log("response Verify email: ", response);
      if (await response.data.success) {
        if (response.data.data.token) {
          setItem("simplitrain_user", response.data.data.token);
        }
        return dispatch({
          type: AUTH_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        return dispatch({ AUTH_ERR, err: response.data.message });
      }
    } catch (error) {
      dispatch({ type: AUTH_ERR, err: error });
    }
  };
};

export {
  checkUser,
  verifyOTP,
  resentOtp,
  SetverifyPassword,
  ForgotPassword,
  UpdatePassword,
  GoogleLoginMethod,
  LogoutUser,
  verifyEmail,
  setUserRole
};
