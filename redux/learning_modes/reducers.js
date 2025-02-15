// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { LEARNINGMODES_BEGIN, LEARNINGMODES_SUCCESS, LEARNINGMODES_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const LearningModesReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case LEARNINGMODES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LEARNINGMODES_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case LEARNINGMODES_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default LearningModesReducer;
