// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { MYCOURSES_BEGIN, MYCOURSES_SUCCESS, MYCOURSES_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const MYCOURSESReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case MYCOURSES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case MYCOURSES_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case MYCOURSES_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default MYCOURSESReducer;
