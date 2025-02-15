// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { setItem } from '../../utils/localStorageControl';
const { GOALS_BEGIN, GOALS_SUCCESS, GOALS_ERR } = actiontyps; 

const getGoals = () => {
  return async (dispatch) => {
    try {
      dispatch({type: GOALS_BEGIN});
      let response = await DataService.get(`goal`);
      if(await response.data.success){
        return dispatch({ type: GOALS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: GOALS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: GOALS_ERR, err:err});
    }
  };
};

const addGoals = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: GOALS_BEGIN});
      let postData = {}
      
      let response = await DataService.post('user/check', postData);
      // console.log('responseresponse', response);
      if(await response.data.success){
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({ type: GOALS_SUCCESS, data:{...response.data.data, newUser:response.data.create}});
      }else{
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: GOALS_ERR, err:response.data.message});
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: GOALS_ERR, err:err});
    }
  };
};

const updateGoals = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: GOALS_BEGIN});
      let postData = {}
      if(data.type == 'email'){
        postData = {
          email: data.username,
          type: data.type, // phone
          role:"LEARNER" //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
        };
      }else{
        postData = {
          phone:data.username,
          countryCode:data.phone_code,
          type: data.type, // phone
          role:"LEARNER" //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
        }
      }
      
      let response = await DataService.post('user/check', postData);
      // console.log('responseresponse', response);
      if(await response.data.success){
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({ type: GOALS_SUCCESS, data:{...response.data.data, newUser:response.data.create}});
      }else{
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: GOALS_ERR, err:response.data.message});
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: GOALS_ERR, err:err});
    }
  };
};


export { getGoals, addGoals, updateGoals };
