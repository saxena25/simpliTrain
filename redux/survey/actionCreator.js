import { DataService } from '../../dataService/dataService';
import actionTypes from './actionsTypes';

const { SURVEY_BEGIN, SURVEY_SUCCESS, SURVEY_ERR } = actionTypes; 


const createSurveyByInstructor = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.post(`surveytemplate/add`, data);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
    }
  };
};

const createFolder = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.post(`survey-folder/add`, data);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
    }
  };
};

const getAllInstructorFolder = () => {
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.get(`survey-folder/all`);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data.data , message : 'Response successfully'});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
      console.log("try catch failed getAllInstructorFolder survey")
    }
  };
};

const getTemplateByFolderId = (data) => {
    console.log("getTemplateByFolderId in survey : " , getTemplateByFolderId);
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.get(`survey-folder/${data.surveyid}`);
      if(await response.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.message});
      }
    } catch (err) {
      console.log("Response on failed of folders", err);
      dispatch({ type: SURVEY_ERR, err:err});
    }
  };
};


const getSurveyTemplateById = (data) => {
//   console.log("Data in getSurveyTemplateById" , data)
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.get(`surveytemplate/get/${data}`);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
    }
  };
};

const SendSurveyResponse = (data , poll_id) => {
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.post(`usersurveyresponses/attempt/poll/${poll_id}`, data);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
    }
  };
};

const addSurveyToBatch = (data) => { 
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.post(`survey/add`, data);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
    }
  };
}

const getBatchesFormCourse = (courseid) => { // course details all polls -  from batches 
  console.log("CourseId : " , courseid)
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.get(`survey/all/batches/${courseid.courseId}`);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
    }
  }
}

const getPollsOfBatch = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.get(`polls/all/1615c519-0f4e-40bf-a47b-aaf59bcbd5d8`);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
    }
  }
}

const addTemplateToFolder = (folderId , data) => {
  console.log("actionCreator addTemplateTOFolder , " , folderId , data)
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.put(`survey-folder/update/${data.folderId}`, data.data);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
    }
  };
}

const SaveResponseOfPolls = (pollid , data) => {
  console.log("actionCreator addTemplateTOFolder , " , pollid , data)
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.put(`usersurveyresponses/attempt/survey/${pollid}`, data.data);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
    }
  };
}

const getPollResult = (pollid) => {
  return async (dispatch) => {
    try {
      dispatch({type: SURVEY_BEGIN});
      let response = await DataService.get(`survey/result/${pollid}`);
      if(await response.data.success){
        return dispatch({ type: SURVEY_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: SURVEY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: SURVEY_ERR, err:err});
    }
  }
}

export { getAllInstructorFolder, getBatchesFormCourse , getPollResult , getPollsOfBatch , SaveResponseOfPolls ,getTemplateByFolderId , createSurveyByInstructor , addSurveyToBatch, createFolder, SendSurveyResponse , getSurveyTemplateById , addTemplateToFolder };
