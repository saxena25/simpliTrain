// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { getItem, setItem } from '../../utils/localStorageControl';
const { WORK_EXPRIENCE_BEGIN, WORK_EXPRIENCE_SUCCESS, WORK_EXPRIENCE_ERR, ADD_WORK_EXPRIENCE_BEGIN, ADD_WORK_EXPRIENCE_SUCCESS, ADD_WORK_EXPRIENCE_ERR } = actiontyps; 

const getWorkExprience = () => {
  return async (dispatch) => {
    try {
      dispatch({type: WORK_EXPRIENCE_BEGIN});
      let response = await DataService.get(`work-experience/user-experiences`);
      if(await response.data.success){
        return dispatch({ type: WORK_EXPRIENCE_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: WORK_EXPRIENCE_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: WORK_EXPRIENCE_ERR, err:err});
    }
  };
};

const addWorkExprience = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_WORK_EXPRIENCE_BEGIN});
      const userID = getItem('simplitrain_user_id');
      let postData = {
        userId: userID,
        job_title: data.title,
        company_name: data.company,
        start_date: data.startDate,
        end_date: data.endDate,
        employment_type: data.employmentType,
        industry: data.industry,
        location: data.location
      }
      
      let response = await DataService.post('work-experience', postData);
      console.log('responseresponse', response);
      if(await response.data.success){
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ADD_WORK_EXPRIENCE_SUCCESS, data:{...response.data.data}});
      }else{
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ADD_WORK_EXPRIENCE_ERR, err:response.data.message});
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: ADD_WORK_EXPRIENCE_ERR, err:err});
    }
  };
};

const updateWorkExprience = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_WORK_EXPRIENCE_BEGIN});
      const userID = getItem('simplitrain_user_id');
      let postData = {
        userId: userID,
        job_title: data.title,
        company_name: data.company,
        start_date: data.startDate,
        end_date: data.endDate,
        employment_type: data.employmentType,
        industry: data.industry,
        location: data.location
      }
      
      let response = await DataService.put(`work-experience/${data.id}`, postData);
      console.log('responseresponse', response);
      if(await response.data.success){
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ADD_WORK_EXPRIENCE_SUCCESS, data:{...response.data.data}});
      }else{
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: ADD_WORK_EXPRIENCE_ERR, err:response.data.message});
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: ADD_WORK_EXPRIENCE_ERR, err:err});
    }
  };
};


export { getWorkExprience, addWorkExprience, updateWorkExprience };
