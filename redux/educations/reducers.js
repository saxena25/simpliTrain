// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { EDUCATIONS_BEGIN, EDUCATIONS_SUCCESS, EDUCATIONS_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const EducationsReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case EDUCATIONS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EDUCATIONS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case EDUCATIONS_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default EducationsReducer;
