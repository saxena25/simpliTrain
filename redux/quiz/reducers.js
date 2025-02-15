// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import actionTypes from "./actionsTypes";

const { QUIZ_BEGIN, QUIZ_SUCCESS, QUIZ_ERR } = actionTypes; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

const ContactReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case QUIZ_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case QUIZ_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case QUIZ_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default ContactReducer;
