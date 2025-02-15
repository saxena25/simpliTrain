// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { CATEGORY_BEGIN, CATEGORY_SUCCESS, CATEGORY_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const CategoryReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case CATEGORY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case CATEGORY_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default CategoryReducer;
