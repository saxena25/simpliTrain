
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { setItem } from '../../utils/localStorageControl';
import { data } from 'autoprefixer';
import Password from '../../screens/dashboard/setting/Password';
const { SETTINGS_BEGIN, SETTINGS_SUCCESS, SETTINGS_ERR } = actiontyps;
const {AUTH_BEGIN, AUTH_SUCCESS, AUTH_ERR} = actiontyps

const getUserSettings = () =>{
  return async (dispatch) => {
    try {
      dispatch({type: SETTINGS_BEGIN});
      let response = await DataService.get(`usersettings/user`);
      // console.log('getSettings redux response', response);
      if(await response.data && response.data.data){
        return dispatch({ type: SETTINGS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SETTINGS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SETTINGS_ERR, err:err});
    }
  };
}

const updateSettings = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: SETTINGS_BEGIN});
      console.log("notification from Redux: ", data.notification);
      let postData = {
        timezoneId: data.timezoneId,
        languageIds: data.languageIds,
        learning_modes: data.learning_modes,
        reminders: data.reminders,
        notification: data.notification,

      };      
      let response = await DataService.put('usersettings/user', postData);
      console.log('Redux response', response);
      if(await response.data.success){
        return dispatch({ type: SETTINGS_SUCCESS, data:{...response.data.data}});
      }else{
        return dispatch({ type: SETTINGS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SETTINGS_ERR, err:err});
    }
  };
};

const getPaymentMethods = () =>{
  return async (dispatch) => {
    try {
      dispatch({type: SETTINGS_BEGIN});
      let response = await DataService.get(`userpaymentmethod/user`);
      console.log('Get PaymentMethod redux response', response.data.data);
      if(await response.data && response.data.data){
        return dispatch({ type: SETTINGS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SETTINGS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SETTINGS_ERR, err:err});
    }
  };
}

const updatePaymentMethods = (data) =>{
  return async (dispatch) =>{
    try {
      dispatch({type: SETTINGS_BEGIN});
      let postData = {
        data
      }
      console.log("paymentMethods from Redux: ", data);
      let response = await DataService.post(`userpaymentmethod/user`,data);
      console.log('Get PaymentMethod redux response', response);
      if(await response.data.success){
        return dispatch({ type: SETTINGS_SUCCESS, data:{...response.data.data}});
      }else{
        return dispatch({ type: SETTINGS_ERR, err:response.data.message});
      }
    } catch (error) {
      dispatch({ type: SETTINGS_ERR, err:error});
    }
  }
}

const deleteCard = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: SETTINGS_BEGIN});
      let response = await DataService.delete(`userpaymentmethod/${data.id}`);
      console.log('delete PaymentMethod redux response', response.data.success);
      if(await response.data.success){
        return dispatch({ type: SETTINGS_SUCCESS, data:{...response.data.data}});
      }else{
        return dispatch({ type: SETTINGS_ERR, err:response.data.message});
      }
    } catch (error) {
      dispatch({ type: SETTINGS_ERR, err:error});
    }
  }
}

const deleteAccount = (data) =>{
  return async (dispatch) =>{
    try {
      dispatch({type: SETTINGS_BEGIN});
      let response = await DataService.post(`user/delete-user`);
      console.log('delete Account redux response', response);
      if(await response.data.success){
        return dispatch({ type: SETTINGS_SUCCESS, data:{...response.data.data}});
      }else{
        return dispatch({ type: SETTINGS_ERR, err:response.data.message});
      }
    } catch (error) {
      dispatch({type: SETTINGS_ERR, err:error});
    }
  }
}

const sendEmailOtp = () =>{
  return async (dispatch) =>{
    try {
      dispatch({type: SETTINGS_BEGIN});
      let response = await DataService.post(`user/send-email-otp/update-password`);
      if(await response.data.success){
        return dispatch({type: SETTINGS_SUCCESS, data:{...response.data.data}});
      }else{
        return dispatch({type: SETTINGS_ERR, err: response.data.message});
      }
    } catch (error) {
      dispatch({type: SETTINGS_ERR, err: error});
    }
  }
}

const verifyEmailPassword = (data) =>{
  return async (dispatch) =>{
    try {
      dispatch({type: SETTINGS_BEGIN});
      let postData = {
        otp: data.otp
      }
      // console.log("1 redux verify Email: ", data);
      console.log("2 redux email: ", postData);
      let response = await DataService.post(`user/verify-email-otp/update-password`, postData);
      if(await response.data.success){
        return dispatch({type: SETTINGS_SUCCESS, data: {...response.data.data}});
      }else{
        return dispatch({type: SETTINGS_ERR, err: response.data.message});
      }
    } catch (error) {
      dispatch({type: SETTINGS_ERR, err: error});
    }
  }
}

const updateUserPassword = (data) =>{
  return async (dispatch) =>{
    try {
      dispatch({type: SETTINGS_BEGIN});
      let postData = {
        password: data.password
      }
      console.log("redux password: ", postData);
      let response = await DataService.post(`user/update/password`);
      console.log("Set Password redux response: ", response);
      if(await response.data.success){
        return dispatch({type: SETTINGS_SUCCESS, data: {...response.data.data}});
      }else{
        return dispatch({type: SETTINGS_ERR, err: response.data.message});
      }
    } catch (error) {
      dispatch({type: SETTINGS_ERR, error: error});
    }
  }
}




export { updateSettings, getUserSettings, getPaymentMethods, updatePaymentMethods, deleteCard, deleteAccount, sendEmailOtp, verifyEmailPassword, updateUserPassword };
