// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { FAQS_BEGIN, FAQS_SUCCESS, FAQS_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const FaqsReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case FAQS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FAQS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case FAQS_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default FaqsReducer;
