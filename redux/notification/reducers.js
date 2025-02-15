// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { NOTIFICATION_BEGIN, NOTIFICATION_SUCCESS, NOTIFICATION_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const notificationReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case NOTIFICATION_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case NOTIFICATION_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default notificationReducer;
