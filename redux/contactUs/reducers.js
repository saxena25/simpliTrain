// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import actionTypes from "./actionsTypes";

const { CONTACT_BEGIN, CONTACT_SUCCESS, CONTACT_ERR } = actionTypes; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

const ContactReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case CONTACT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CONTACT_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case CONTACT_ERR:
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
