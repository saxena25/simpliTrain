// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { setItem } from '../../utils/localStorageControl';
const { CATEGORY_BEGIN, CATEGORY_SUCCESS, CATEGORY_ERR } = actiontyps; 

const getCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({type: CATEGORY_BEGIN});
      let response = await DataService.get(`coursecategories`);
      // console.log('Redux Category :', response);
      if(await response.data.success){
        return dispatch({ type: CATEGORY_SUCCESS, data:response.data.data});

      }else{
        return dispatch({ type: CATEGORY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: CATEGORY_ERR, err:err});
    }
  };
};

const getSubCategoryById = (data) =>{
  return async (dispatch) => {
    try {
      dispatch({type: CATEGORY_BEGIN});
      // useronboarding
      // console.log("cetegory id from redux", data.id)
      let response = await DataService.get(`coursesubcategories/all/${data.id}`);
      
      // console.log('response ==  response', response);
      if(await response.data.success){
        // console.log("redux response sub category", response.data.data);
        return dispatch({ type: CATEGORY_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: CATEGORY_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: CATEGORY_ERR, err:err});
    }
  };
}


export { getCategory, getSubCategoryById };
