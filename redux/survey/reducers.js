// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import actionTypes from "./actionsTypes";

const { SURVEY_BEGIN, SURVEY_SUCCESS, SURVEY_ERR } = actionTypes; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

const ContactReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case SURVEY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SURVEY_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case SURVEY_ERR:
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
