// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { CHECKOUT_BEGIN, CHECKOUT_SUCCESS, CHECKOUT_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const CheckoutReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case CHECKOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case CHECKOUT_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default CheckoutReducer;
