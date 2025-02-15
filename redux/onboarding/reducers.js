// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

// console.log('Cookies.get(techlogedIn)', Cookies.get('techlogedIn'));
const { ON_BOARDING_BEGIN, ON_BOARDING_SUCCESS, ON_BOARDING_ERR } = actiontyps; 

// console.log('data', data);
const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const OnBoardingReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case ON_BOARDING_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case ON_BOARDING_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case ON_BOARDING_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default OnBoardingReducer;
