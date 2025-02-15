import { DataService } from '../../dataService/dataService';
import actionTypes from './actionsTypes';

const { QUIZ_BEGIN, QUIZ_SUCCESS, QUIZ_ERR } = actionTypes; 


const createQuizByInstructor = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: QUIZ_BEGIN});
      let response = await DataService.post(`quiztemplate/add`, data);
      if(await response.data.success){
        return dispatch({ type: QUIZ_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: QUIZ_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: QUIZ_ERR, err:err});
    }
  };
};

const createFolder = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: QUIZ_BEGIN});
      let response = await DataService.post(`quiz-folder/add`, data);
      if(await response.data.success){
        return dispatch({ type: QUIZ_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: QUIZ_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: QUIZ_ERR, err:err});
    }
  };
};

const getAllInstructorFolder = () => {
  return async (dispatch) => {
    try {
      dispatch({type: QUIZ_BEGIN});
      let response = await DataService.get(`quiz-folder/all`);
      if(await response.data.success){
        return dispatch({ type: QUIZ_SUCCESS, data:response.data.data , message : 'Response successfully'});
      }else{
        return dispatch({ type: QUIZ_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: QUIZ_ERR, err:err});
      console.log("try catch failed getAllInstructorFolder")
    }
  };
};

const getTemplateByFolderId = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: QUIZ_BEGIN});
      let response = await DataService.get(`quiz-folder/${data.pollid}`);
      if(await response.success){
        return dispatch({ type: QUIZ_SUCCESS, data:response.data});
      }else{
        return dispatch({ type: QUIZ_ERR, err:response.message});
      }
    } catch (err) {
      console.log("Response on failed of folders", err);
      dispatch({ type: QUIZ_ERR, err:err});
    }
  };
};


const getPollTemplateById = (data) => {
  console.log("Data in getQuizTemplateById" , data)
  return async (dispatch) => {
    try {
      dispatch({type: QUIZ_BEGIN});
      let response = await DataService.get(`polltemplate/get/${data}`);
      if(await response.data.success){
        return dispatch({ type: QUIZ_SUCCESS, data:response.data});
      }else{
        return dispatch({ type: QUIZ_ERR, err:response.message});
      }
    } catch (err) {
      dispatch({ type: QUIZ_ERR, err:err});
    }
  };
};

const SendPollResponse = (data , quiz_id) => {
  return async (dispatch) => {
    try {
      dispatch({type: QUIZ_BEGIN});
      let response = await DataService.post(`userquizresponses/attempt/quiz/${quiz_id}`, data);
      if(await response.data.success){
        return dispatch({ type: QUIZ_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: QUIZ_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: QUIZ_ERR, err:err});
    }
  };
};

const addQuizToBatch = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: QUIZ_BEGIN});
      let response = await DataService.post(`quiz/add`, data);
      if(await response.data.success){
        return dispatch({ type: QUIZ_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: QUIZ_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: QUIZ_ERR, err:err});
    }
  };
}

const getQuizOfBatch = (batchid) => {
  console.log("Bachid in getQuizOFBatch" , batchid);
  return async (dispatch) => {
    try {
      dispatch({type: QUIZ_BEGIN});
      let response = await DataService.get(`polls/all/${batchid}`);
      if(await response.data.success){
        return dispatch({ type: QUIZ_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: QUIZ_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: QUIZ_ERR, err:err});
    }
  }
}

const addTemplateToFolder = (folderId , data) => {
  console.log("actionCreator addTemplateTOFolder , " , folderId , data)
  return async (dispatch) => {
    try {
      dispatch({type: QUIZ_BEGIN});
      let response = await DataService.put(`quiz-folder/update/${data.folderId}`, data.data);
      if(await response.data.success){
        return dispatch({ type: QUIZ_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: QUIZ_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: QUIZ_ERR, err:err});
    }
  };
}



export { getAllInstructorFolder, getQuizOfBatch ,getTemplateByFolderId , createQuizByInstructor , SendPollResponse, createFolder, getPollTemplateById , addQuizToBatch , addTemplateToFolder };
