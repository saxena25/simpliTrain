// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { setItem } from '../../utils/localStorageControl';
const { MASTER_DATA_BEGIN, MASTER_DATA_SUCCESS, MASTER_DATA_ERR } = actiontyps; 

const getCountries = () => {
  return async (dispatch) => {
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`country`);
      if(await response.data.success){
        return dispatch({ type: MASTER_DATA_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: MASTER_DATA_ERR, err:err});
    }
  };
};

const getStates = () => {
  return async (dispatch) => {
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`state`);
      if(await response.data.success){
        return dispatch({ type: MASTER_DATA_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: MASTER_DATA_ERR, err:err});
    }
  };
};

const getLanguages = () => {
  return async (dispatch) => {
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`language`);
      console.log("rRedux Language", response);
      if(await response.data.success){
        return dispatch({ type: MASTER_DATA_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: MASTER_DATA_ERR, err:err});
    }
  };
};

const getTimezones = () => {
  return async (dispatch) => {
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`timezone`);
      if(await response.data.success){
        return dispatch({ type: MASTER_DATA_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: MASTER_DATA_ERR, err:err});
    }
  };
};

const getDegrees = () => {
  return async (dispatch) => {
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`degree`);
      if(await response.data.success){
        return dispatch({ type: MASTER_DATA_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: MASTER_DATA_ERR, err:err});
    }
  };
};

const getEmploymentType = () => {
  return async (dispatch) => {
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`employment-type`);
      if(await response.data.success){
        return dispatch({ type: MASTER_DATA_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: MASTER_DATA_ERR, err:err});
    }
  };
};

const getIndustries = () => {
  return async (dispatch) => {
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`industry`);
      if(await response.data.success){
        return dispatch({ type: MASTER_DATA_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: MASTER_DATA_ERR, err:err});
    }
  };
};

const getExpertise = () => {
  return async (dispatch) => {
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`expertise`);
      if(await response.data.success){
        return dispatch({ type: MASTER_DATA_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: MASTER_DATA_ERR, err:err});
    }
  };
};

const getSkills = () =>{
  return async (dispatch) =>{
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`skill`);
      if(await response.data.success){
        return dispatch({type: MASTER_DATA_SUCCESS, data: response.data.data});
      }else{
        return dispatch({type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (error) {
      return dispatch({type: MASTER_DATA_ERR, err:error});
    }
  }
}

const getLearningMode = () =>{
  return async (dispatch)=>{
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`learningmode`);
      if(await response.data.success){
        return dispatch({type: MASTER_DATA_SUCCESS, data: response.data.data});
      }else{
        return dispatch({type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (error) {
      return dispatch({type: MASTER_DATA_ERR, err:error});
    }
  }
}

const getGoals = () =>{
  return async (dispatch)=>{
    try {
      dispatch({type: MASTER_DATA_BEGIN});
      let response = await DataService.get(`goal`);
      if(await response.data.success){
        return dispatch({type: MASTER_DATA_SUCCESS, data: response.data.data});
      }else{
        return dispatch({type: MASTER_DATA_ERR, err:response.data.message});
      }
    } catch (error) {
      return dispatch({type: MASTER_DATA_ERR, err:error});
    }
  }
}


export { getCountries, getStates, getLanguages, getTimezones, getDegrees, getEmploymentType, getIndustries, getExpertise, getSkills, getLearningMode, getGoals };
