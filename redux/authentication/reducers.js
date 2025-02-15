// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

// console.log('Cookies.get(techlogedIn)', Cookies.get('techlogedIn'));
const token = getItem('simplitrain_token', true);
const data = getItem('simplitrain_user');
const { AUTH_BEGIN, AUTH_SUCCESS, AUTH_ERR, SET_USER_ROLE } = actiontyps; 

// console.log('data  =  token', data, token);
const initState = {
  login: token && data?true:false,
  data: data?data:null,
  role: data?.role,
  loading: false,
  error: null,
};
// console.log('initStateinitStateinitStateinitState', initState);
/**
 *
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case AUTH_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        login: action.data && action.data.token?true:false,
        data: action.data,
        loading: false,
      };
    case AUTH_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    case "SET_USER_ROLE":
      console.log("Reducer Updating role: ", action.payload);
      return{
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};
export default AuthReducer;
