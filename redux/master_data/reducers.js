// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';

import { getItem } from "../../utils/localStorageControl";
import actiontyps from "./actionsTypes";

const { MASTER_DATA_BEGIN, MASTER_DATA_SUCCESS, MASTER_DATA_ERR } = actiontyps; 

const initState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const MasterDataReducer = (state = initState, action) => {
  // const { type, data, err } = action;
  switch (action.type) {
    case MASTER_DATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case MASTER_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case MASTER_DATA_ERR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
};
export default MasterDataReducer;
