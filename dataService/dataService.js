import axios from 'axios';
import { getItem } from '../utils/localStorageControl';
import { LogoutUser } from '../redux/authentication/actionCreator';
// import Cookies from 'js-cookie';


// for live
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

class DataService {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
      headers: {  },
    });
  }

  static getWithData(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'GET',
      url: path,
      data,
      headers: {  },
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...optionalHeader },
    });
  }

  static patch(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: data,
      headers: { ...optionalHeader  },
    });
  }
  
  static delete(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'DELETE',
      url: path,
      data: data,
      headers: { ...optionalHeader  },
    });
  }

  static put(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'PUT',
      url: path,
      data: data,
      headers: { ...optionalHeader },
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((configparams) => {
  // do something before executing the request
  // For example tag along the Simplitrain access token to request header or set a cookie
  const requestConfig = configparams;
  const { headers } = configparams;
  requestConfig.headers = { ...headers, 'Authorization': `Bearer ${getItem('simplitrain_token', true)}` };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => {
    // Token is not valid
    // console.log('API   responseresponse', response);
    
    if(response.status == 200 && response.data.success){
      return response;
    }else{
      if(response.data.message == 'Token is not valid'){
        window.location.reload();
      }else{
        return response;
      }
    }
  },
  // response,
  error => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;
    const originalRequest = error.config;
    console.log('error == ', response);
    if (response) {
      if (response.status === 500) {
        // do something here
        return {data:{status:false, message: 'Something went wrong! Please try after some time'}};
      }else if (response.status === 404) {
        return {data:{status:false, message: 'Page Not Found, Please check your url'}};
      }else if (response.status === 401) {
        return {data: response.data};
      }else if (response.status === 403) {
        // LogoutUser();
        return {data:{status:false, message: 'Token Invalid'}};
      }else if (response.status === 400) {
        // LogoutUser();
        return {data: response.data};
      } else {
        return originalRequest;
      }
    }else{
      console.log('error', error);
    }
    return Promise.reject(error);
  },
);
export { DataService };
