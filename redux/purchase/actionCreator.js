// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { setItem } from '../../utils/localStorageControl';
const { PURCHASE_BEGIN, PURCHASE_SUCCESS, PURCHASE_ERR } = actiontyps; 

const getPurchaseHistory = () => {
  return async (dispatch) => {
    try {
      dispatch({type: PURCHASE_BEGIN});
      let response = await DataService.get(`batch/user/purchases`);
      if(await response.data.success){
        return dispatch({ type: PURCHASE_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: PURCHASE_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: PURCHASE_ERR, err:err});
    }
  };
};




export { getPurchaseHistory };
