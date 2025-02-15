// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { COURSES_BEGIN, COURSES_SUCCESS, COURSES_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const CoursesReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case COURSES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case COURSES_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case COURSES_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default CoursesReducer;
