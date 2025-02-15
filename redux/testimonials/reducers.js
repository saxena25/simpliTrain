// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import actionTypes from "./actionsTypes";

const { TEST_BEGIN, TEST_SUCCESS, TEST_ERR } = actionTypes; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

const TestimonialsReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case TEST_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case TEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case TEST_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default TestimonialsReducer;
