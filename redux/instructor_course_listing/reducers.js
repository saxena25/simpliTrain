// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { INSTRUCTOR_COURSE_LISTING_BEGIN, INSTRUCTOR_COURSE_LISTING_SUCCESS, INSTRUCTOR_COURSE_LISTING_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const instructorCourseListingReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case INSTRUCTOR_COURSE_LISTING_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case INSTRUCTOR_COURSE_LISTING_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case INSTRUCTOR_COURSE_LISTING_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default instructorCourseListingReducer;
