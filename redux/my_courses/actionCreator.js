// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from "../../dataService/dataService";
import actiontyps from "./actionsTypes";
import { setItem } from "../../utils/localStorageControl";
const { MYCOURSES_BEGIN, MYCOURSES_SUCCESS, MYCOURSES_ERR } = actiontyps;

const getMyCourses = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: MYCOURSES_BEGIN });
      let response = await DataService.get(`batch/user`);
      if (await response.data.success) {
        return dispatch({ type: MYCOURSES_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: MYCOURSES_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: MYCOURSES_ERR, err: err });
    }
  };
};

const addMYCOURSES = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MYCOURSES_BEGIN });
      let postData = {
        name: data.skillName,
      };

      let response = await DataService.post("skill", postData);
      console.log("responseresponse", response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: MYCOURSES_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: MYCOURSES_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: MYCOURSES_ERR, err: err });
    }
  };
};

const updateMYCOURSES = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MYCOURSES_BEGIN });
      let postData = {};
      if (data.type == "email") {
        postData = {
          email: data.username,
          type: data.type, // phone
          role: "LEARNER", //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
        };
      } else {
        postData = {
          phone: data.username,
          countryCode: data.phone_code,
          type: data.type, // phone
          role: "LEARNER", //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
        };
      }

      let response = await DataService.post("user/check", postData);
      // console.log('responseresponse', response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: MYCOURSES_SUCCESS,
          data: { ...response.data.data, newUser: response.data.create },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: MYCOURSES_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: MYCOURSES_ERR, err: err });
    }
  };
};

const getDailySchedules = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: MYCOURSES_BEGIN });
      const response = await DataService.get(`batch/daily`);
      if (await response.data.success) {
        return dispatch({ type: MYCOURSES_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: MYCOURSES_ERR, err: response.data.message });
      }
    } catch (error) {
      return dispatch({type: MYCOURSES_ERR, err: error?.message});
    }
  };
};

const getActiveCompletedCourses = () =>{
  return async (dispatch)=>{
    try {
      dispatch({type: MYCOURSES_BEGIN});
      const response = await DataService.get(`batch/user`);
      if(await response.data.success){
        return dispatch({type: MYCOURSES_SUCCESS, data: response.data.data});
      }else{
        return dispatch({type: MYCOURSES_ERR, err: response.data.message});
      }
    } catch (error) {
      return dispatch({type: MYCOURSES_ERR, err: error?.message});
    }
  }
}

export { getMyCourses, addMYCOURSES, updateMYCOURSES, getDailySchedules, getActiveCompletedCourses };
