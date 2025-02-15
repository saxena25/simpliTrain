// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { setItem } from '../../utils/localStorageControl';
const { CHECKOUT_BEGIN, CHECKOUT_SUCCESS, CHECKOUT_ERR } = actiontyps; 

const GetPriceBreakup = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: CHECKOUT_BEGIN});
      let response = await DataService.get(`batch/batch-price/${data.batchId}`);
      if(await response.data.success){
        return dispatch({ type: CHECKOUT_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: CHECKOUT_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: CHECKOUT_ERR, err:err});
    }
  };
};

const GetFinalPrice = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: CHECKOUT_BEGIN});
      let response = await DataService.post(`batch/final-price/${data.batchId}`, data);
      if(await response.data.success){
        return dispatch({ type: CHECKOUT_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: CHECKOUT_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: CHECKOUT_ERR, err:err});
    }
  };
};

const GetCoupons = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: CHECKOUT_BEGIN});
      let response = await DataService.get(`coupon/batch/${data.batchId}`);
      if(await response.data.success){
        return dispatch({ type: CHECKOUT_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: CHECKOUT_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: CHECKOUT_ERR, err:err});
    }
  };
};

const CreateOrder = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: CHECKOUT_BEGIN});
      let response = await DataService.post(`batch/create-order`, data);
      if(await response.data.success){
        return dispatch({ type: CHECKOUT_SUCCESS, data:response.data.order});
      }else{
        return dispatch({ type: CHECKOUT_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: CHECKOUT_ERR, err:err});
    }
  };
};

const PurchaseBatch = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: CHECKOUT_BEGIN});
      let response = await DataService.post(`batch/purchase-batch`, data);
      if(await response.data.success){
        return dispatch({ type: CHECKOUT_SUCCESS, data:response.data.order});
      }else{
        return dispatch({ type: CHECKOUT_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: CHECKOUT_ERR, err:err});
    }
  };
};



export { GetPriceBreakup, GetFinalPrice, GetCoupons, CreateOrder, PurchaseBatch };
