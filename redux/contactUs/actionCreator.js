import { DataService } from '../../dataService/dataService';
import actionTypes from './actionsTypes';

const { CONTACT_BEGIN, CONTACT_SUCCESS, CONTACT_ERR } = actionTypes; 

const sendLearnerSupportRequest = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: CONTACT_BEGIN});
      let response = await DataService.post(`contactus` , data);
      if(await response.data.success){
        return dispatch({ type: CONTACT_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: CONTACT_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: CONTACT_ERR, err:err});
    }
  };
};

const sendInstructorSupportRequest = (data) => {
    return async (dispatch) => {
      try {
        dispatch({type: CONTACT_BEGIN});
        let response = await DataService.post(`contactus` , data);
        if(await response.data.success){
          return dispatch({ type: CONTACT_SUCCESS, data:response.data.data});
        }else{
          return dispatch({ type: CONTACT_ERR, err:response.data.message});
        }
      } catch (err) {
        dispatch({ type: CONTACT_ERR, err:err});
      }
    };
  };



export { sendLearnerSupportRequest , sendInstructorSupportRequest };
