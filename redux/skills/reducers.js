// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { SKILLS_BEGIN, SKILLS_SUCCESS, SKILLS_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const SkillsReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case SKILLS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SKILLS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case SKILLS_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default SkillsReducer;
