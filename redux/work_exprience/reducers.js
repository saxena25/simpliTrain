// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { WORK_EXPRIENCE_BEGIN, WORK_EXPRIENCE_SUCCESS, WORK_EXPRIENCE_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const WorkExprienceReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case WORK_EXPRIENCE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case WORK_EXPRIENCE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case WORK_EXPRIENCE_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default WorkExprienceReducer;
