// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { setItem } from '../../utils/localStorageControl';
const { WISHLIST_BEGIN, WISHLIST_SUCCESS, WISHLIST_ERR } = actiontyps; 

const getWishlist = () => {
  return async (dispatch) => {
    try {
      dispatch({type: WISHLIST_BEGIN});
      let response = await DataService.get(`wishlist/user`);
      if(await response.data.success){
        return dispatch({ type: WISHLIST_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: WISHLIST_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: WISHLIST_ERR, err:err});
    }
  };
};

const removeFromWishlist = (courseId) =>{
  return async (dispatch) =>{
    try {
      dispatch({type: WISHLIST_BEGIN});
      // console.log("Delete Wishlist Redux: ", data);
      let response = await DataService.delete(`wishlist/user/${courseId}`);
      if(await response?.data.success){
        return dispatch({ type: WISHLIST_SUCCESS, data:response?.data.data});
      }else{
        return dispatch({ type: WISHLIST_ERR, err:response?.data.message});
      }
    } catch (error) {
      return dispatch({ type: WISHLIST_ERR, err:error?.message});
    }
  }
}

const updateWISHLIST = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: WISHLIST_BEGIN});
      let postData = {}
      if(data.type == 'email'){
        postData = {
          email: data.username,
          type: data.type, // phone
          role:"LEARNER" //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
        };
      }else{
        postData = {
          phone:data.username,
          countryCode:data.phone_code,
          type: data.type, // phone
          role:"LEARNER" //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
        }
      }
      
      let response = await DataService.post('user/check', postData);
      // console.log('responseresponse', response);
      if(await response.data.success){
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({ type: WISHLIST_SUCCESS, data:{...response.data.data, newUser:response.data.create}});
      }else{
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: WISHLIST_ERR, err:response.data.message});
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: WISHLIST_ERR, err:err});
    }
  };
};


export { getWishlist, removeFromWishlist };
