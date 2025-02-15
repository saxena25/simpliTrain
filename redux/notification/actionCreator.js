// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from "../../dataService/dataService";
import actiontyps from "./actionsTypes";
import { setItem } from "../../utils/localStorageControl";
const { NOTIFICATION_BEGIN, NOTIFICATION_SUCCESS, NOTIFICATION_ERR } =
  actiontyps;

const getNotification = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: NOTIFICATION_BEGIN });
      let response = await DataService.get(`notifications/user`);
      console.log("redux Notification", response.data.data);
      if (await response.data.success) {
        return dispatch({
          type: NOTIFICATION_SUCCESS,
          data: response.data.data,
        });
      } else {
        return dispatch({ type: NOTIFICATION_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: NOTIFICATION_ERR, err: err });
    }
  };
};

const getUnReadNotification = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: NOTIFICATION_BEGIN });
      let response = await DataService.get(`notifications/unread`);
      console.log("redux Notification", response.data.data);
      if (await response.data.success) {
        return dispatch({
          type: NOTIFICATION_SUCCESS,
          data: response.data.data,
        });
      } else {
        return dispatch({ type: NOTIFICATION_ERR, err: response.data.message });
      }
    } catch (error) {
      dispatch({ type: NOTIFICATION_ERR, error: error });
    }
  };
};

const clearNotification = () =>{
  return async (dispatch) =>{
    try {
      dispatch({type: NOTIFICATION_BEGIN});
      const response = await DataService.delete(`notifications`);
      if(await response.data.success){
        return dispatch({type: NOTIFICATION_SUCCESS, data: response.data.data});
      }else{
        return dispatch({type: NOTIFICATION_ERR, err: response.data.message});
      }
    } catch (error) {
      return dispatch({type: NOTIFICATION_ERR, err: error});
    }
  }
}

export { getNotification, getUnReadNotification, clearNotification };
