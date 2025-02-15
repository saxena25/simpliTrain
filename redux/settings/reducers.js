// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { SETTINGS_BEGIN, SETTINGS_SUCCESS, SETTINGS_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const settingsReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case SETTINGS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case SETTINGS_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default settingsReducer;
