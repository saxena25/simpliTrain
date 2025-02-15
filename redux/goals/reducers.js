// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { GOALS_BEGIN, GOALS_SUCCESS, GOALS_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const GoalsReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case GOALS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GOALS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case GOALS_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default GoalsReducer;
