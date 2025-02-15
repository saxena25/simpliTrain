// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { WISHLIST_BEGIN, WISHLIST_SUCCESS, WISHLIST_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const wishlistReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case WISHLIST_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case WISHLIST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case WISHLIST_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default wishlistReducer;
