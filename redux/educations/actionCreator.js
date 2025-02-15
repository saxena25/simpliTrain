// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { getItem, setItem } from '../../utils/localStorageControl';
const { EDUCATIONS_BEGIN, EDUCATIONS_SUCCESS, EDUCATIONS_ERR, ADD_EDUCATIONS_BEGIN, ADD_EDUCATIONS_SUCCESS, ADD_EDUCATIONS_ERR } = actiontyps; 

const getEducations = () => {
  return async (dispatch) => {
    try {
      dispatch({type: EDUCATIONS_BEGIN});
      let response = await DataService.get(`education/user-educations`);
      if(await response.data.success){
        return dispatch({ type: EDUCATIONS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: EDUCATIONS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: EDUCATIONS_ERR, err:err});
    }
  };
};

const addEducations = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_EDUCATIONS_BEGIN});
      const userID = getItem('simplitrain_user_id');
      let postData = {
        userId: userID,
        degreeId: data.degree,
        collegeName: data.college,
        fieldOfStudy: data.fieldOfStudy,
        startDate: data.startDate,
        endDate: data.endDate
      }
      
      let response = await DataService.post('education', postData);
      console.log('responseresponse', response);
      if(await response.data.success){
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ADD_EDUCATIONS_SUCCESS, data:{...response.data.data}});
      }else{
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ADD_EDUCATIONS_ERR, err:response.data.message});
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: ADD_EDUCATIONS_ERR, err:err});
    }
  };
};

const updateEducations = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_EDUCATIONS_BEGIN});
      const userID = getItem('simplitrain_user_id');
      let postData = {
        userId: userID,
        degreeId: data.degree,
        collegeName: data.college,
        fieldOfStudy: data.fieldOfStudy,
        startDate: data.startDate,
        endDate: data.endDate
      }
      
      let response = await DataService.put(`education/${data.id}`, postData);
      // console.log('responseresponse', response);
      if(await response.data.success){
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ADD_EDUCATIONS_SUCCESS, data:{...response.data.data}});
      }else{
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ADD_EDUCATIONS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: ADD_EDUCATIONS_ERR, err:err});
    }
  };
};


export { getEducations, addEducations, updateEducations };
