// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { setItem } from '../../utils/localStorageControl';
const { ON_BOARDING_BEGIN, ON_BOARDING_SUCCESS, ON_BOARDING_ERR } = actiontyps; 

const getUserOnboarding = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ON_BOARDING_BEGIN});
      // useronboarding
      let response = await DataService.get(`onboarding/getByUserId`);
      
      console.log('response ==  response', response);
      if(await response.data.success){
        return dispatch({ type: ON_BOARDING_SUCCESS, data:{...response.data.data}});
      }else{
        return dispatch({ type: ON_BOARDING_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: ON_BOARDING_ERR, err:err});
    }
  };
};

const getInstructorOnboarding = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ON_BOARDING_BEGIN});
      // useronboarding
      let response = await DataService.get(`instructor/instructoroboarding`);
      
      console.log('response ==  response', response);
      if(await response.data.success){
        return dispatch({ type: ON_BOARDING_SUCCESS, data:{...response.data.data}});
      }else{
        return dispatch({ type: ON_BOARDING_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: ON_BOARDING_ERR, err:err});
    }
  };
};




const updateUserOnboarding = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ON_BOARDING_BEGIN});
      let postData = {
        skills: data.onboarding.skills,
        goals:data.onboarding.immediate_goal,
        learning_style:data.onboarding.learning_style,
        name:data.onboarding.personal_details.full_name,
        gender:data.onboarding.personal_details.gender,
        age_limit:data.onboarding.personal_details.age,
        status:data.onboarding.status,
        type: data.onboarding.type?data.onboarding.type:null
      }
      let response = await DataService.put(`onboarding`, postData);
      console.log('responseresponse', response);
      if(await response.data.success){
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ON_BOARDING_SUCCESS, data:{...response.data.data, newUser:response.data.create}});
      }else{
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ON_BOARDING_ERR, err:response.data.message});
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: ON_BOARDING_ERR, err:err});
    }
  };
};

const updateInstructorOnboarding = (data) => {
  return async (dispatch) => {
    try {

      dispatch({type: ON_BOARDING_BEGIN});
      let postData = {
        expertises: data.onboarding.skills,
        experienceInYears: data.onboarding.experience,
        teachingExperienceType:data.onboarding.immediate_goal,
        teachingStyle:data.onboarding.learning_style,
        name:data.onboarding.personal_details.full_name,
        gender:data.onboarding.personal_details.gender,
        dob:data.onboarding.personal_details.age,
        status:data.onboarding.status,
        type: data.onboarding.type?data.onboarding.type:null
      }
      let response = await DataService.post(`instructor`, postData);
      console.log('responseresponse', response);
      if(await response.data.success){
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ON_BOARDING_SUCCESS, data:{...response.data.data, newUser:response.data.create}});
      }else{
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ON_BOARDING_ERR, err:response.data.message});
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: ON_BOARDING_ERR, err:err});
    }
  };
};



export { getUserOnboarding, updateUserOnboarding, getInstructorOnboarding, updateInstructorOnboarding };
