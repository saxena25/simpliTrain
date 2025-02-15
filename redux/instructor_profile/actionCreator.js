import { DataService } from '../../dataService/dataService';
import actionTypes from './actionsTypes';

const { PROFILE_BEGIN, PROFILE_SUCCESS, PROFILE_ERR } = actionTypes; 

const getInstructorProfileById = (profile) => {
  return async (dispatch) => {
    console.log("profile data in action" , profile.profile.id)
    try {
      dispatch({type: PROFILE_BEGIN});
      let response = await DataService.get(`instructor/profile/${profile.profile.id}`);
      if(await response.data.success){
        return dispatch({ type: PROFILE_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: PROFILE_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err:err });
    }
  };
};

const getSimilarInstructorById = (profile) => {
  return async (dispatch) => {
    try {
      dispatch({type: PROFILE_BEGIN});
      let response = await DataService.get(`instructor/similar/${profile.profile.id}`);
      if(await response.data.success){
        return dispatch({ type: PROFILE_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: PROFILE_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err:err });
    }
  };
};

const getInstructorCoursesById = (profile) => {
  return async (dispatch) => {
    try {
      dispatch({type: PROFILE_BEGIN});
      let response = await DataService.get(`instructor/courses/${profile.profile.id}`);
      if(await response.data.success){
        return dispatch({ type: PROFILE_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: PROFILE_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err:err });
    }
  };
}

const getInstructorReviewById = (profile) => {
  return async (dispatch) => {
    try {
      dispatch({type: PROFILE_BEGIN});
      let response = await DataService.get(`coursereview/get/user/${profile.profile.id}`);
      if(await response.data.success){
        return dispatch({ type: PROFILE_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: PROFILE_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err:err });
    }
  };
}

export { getInstructorProfileById , getSimilarInstructorById , getInstructorCoursesById , getInstructorReviewById };
