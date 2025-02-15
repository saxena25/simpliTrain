// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { PURCHASE_BEGIN, PURCHASE_SUCCESS, PURCHASE_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const purchaseReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case PURCHASE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case PURCHASE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case PURCHASE_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default purchaseReducer;
