// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import actionTypes from "./actionsTypes";

const { POLLS_BEGIN, POLLS_SUCCESS, POLLS_ERR } = actionTypes; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

const ContactReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case POLLS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case POLLS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case POLLS_ERR:
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
