import { DataService } from '../../dataService/dataService';
import actionTypes from './actionsTypes';

const { POLLS_BEGIN, POLLS_SUCCESS, POLLS_ERR } = actionTypes; 


const createPollByInstructor = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.post(`polltemplate/add`, data);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
    }
  };
};

const createFolder = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.post(`polls-folder/add`, data);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
    }
  };
};

const getAllInstructorFolder = () => {
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.get(`polls-folder/all`);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data.data , message : 'Response successfully'});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
      console.log("try catch failed getAllInstructorFolder")
    }
  };
};

const getTemplateByFolderId = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.get(`polls-folder/${data.pollid}`);
      if(await response.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.message});
      }
    } catch (err) {
      console.log("Response on failed of folders", err);
      dispatch({ type: POLLS_ERR, err:err});
    }
  };
};


const getPollTemplateById = (data) => {
  console.log("Data in getPollTemplateById" , data)
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.get(`polltemplate/get/${data}`);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
    }
  };
};

const SendPollResponse = (data , poll_id) => {
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.post(`userpollsresponses/attempt/poll/${poll_id}`, data);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
    }
  };
};

const addPollsToBatch = (data) => { 
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.post(`polls/add`, data);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
    }
  };
}

const getBatchesFormCourse = (courseid) => { // course details all polls -  from batches 
  console.log("CourseId : " , courseid)
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.get(`polls/all/batches/${courseid.courseId}`);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
    }
  }
}

const getPollsOfBatch = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.get(`polls/all/1615c519-0f4e-40bf-a47b-aaf59bcbd5d8`);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
    }
  }
}

const addTemplateToFolder = (folderId , data) => {
  console.log("actionCreator addTemplateTOFolder , " , folderId , data)
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.put(`polls-folder/update/${data.folderId}`, data.data);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
    }
  };
}

const SaveResponseOfPolls = (pollid , data) => {
  console.log("actionCreator addTemplateTOFolder , " , pollid , data)
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.put(`userpollsresponses/attempt/poll//${pollid}`, data.data);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
    }
  };
}

const getPollResult = (pollid) => {
  return async (dispatch) => {
    try {
      dispatch({type: POLLS_BEGIN});
      let response = await DataService.get(`polls/result/${pollid}`);
      if(await response.data.success){
        return dispatch({ type: POLLS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: POLLS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: POLLS_ERR, err:err});
    }
  }
}

export { getAllInstructorFolder, getBatchesFormCourse , getPollResult , getPollsOfBatch , SaveResponseOfPolls ,getTemplateByFolderId , createPollByInstructor , SendPollResponse, createFolder, getPollTemplateById , addPollsToBatch , addTemplateToFolder };
