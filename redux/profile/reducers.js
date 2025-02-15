// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { PROFILE_BEGIN, PROFILE_SUCCESS, PROFILE_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const ProfileReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case PROFILE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case PROFILE_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default ProfileReducer;
