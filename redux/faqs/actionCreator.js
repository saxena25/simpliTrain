// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { setItem } from '../../utils/localStorageControl';
const { FAQS_BEGIN, FAQS_SUCCESS, FAQS_ERR } = actiontyps; 

const getFaqCategories = () => {
  return async (dispatch) => {
    try {
      dispatch({type: FAQS_BEGIN});
      let response = await DataService.get(`faqs/categories/fetch/all/category`);
      if(await response.data.success){
        return dispatch({ type: FAQS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: FAQS_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: FAQS_ERR, err:err});
    }
  };
};

const getFaqsById = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: FAQS_BEGIN});
      let response = await DataService.get(`/faqs/fetch/faq/${data.id}`);
      if(await response.data.success){
        return dispatch({ type: FAQS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: FAQS_ERR, err:response.data.message});
      }
    } catch (err) {
      console.log("Axios Err", err);
      
      dispatch({ type: FAQS_ERR, err:err});
    }
  };
};

const getFaqsByPagination = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: FAQS_BEGIN});
      let response = await DataService.get(`/faqs/limit?page=${data.page}&limit=10&filter=${data.id}`);
      console.log(response.data.pagination.nextPage);
      if(await response.data.success){
        return dispatch({ type: FAQS_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: FAQS_ERR, err:response.data.message});
      }
    } catch (err) {
      console.log("Axios Err", err);
      
      dispatch({ type: FAQS_ERR, err:err});
    }
  };
};



const getFaqBySearch = (data) =>{
  return async (dispatch) => {
    try {
      console.log("redux search",data);
      dispatch({type: FAQS_BEGIN});
      let response = await DataService.get(`/faqs/fetch/search?${data.search}`);
      if(response.data && response.data.success){
        return dispatch({type: FAQS_SUCCESS, data: response.data.data});
      }else{
        return dispatch({type: FAQS_ERR, err: response.data.message});
      }
    } catch (error) {
      console.log("Search Axios Error", error);

      dispatch({type: FAQS_ERR, error: error})
    }
  }
}

export { getFaqsById, getFaqCategories, getFaqBySearch, getFaqsByPagination };
