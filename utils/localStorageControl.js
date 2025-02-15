// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';
const getItem = (key, global=false) => {
  let data = '';
  if(global){
    data = typeof window !== 'undefined' ? localStorage.getItem(key) : '';
  }else{
    data = typeof window !== 'undefined' ? sessionStorage.getItem(key) : '';
  }
  
  try {
    return data?JSON.parse(window.atob(data)):null;
  } catch (err) {
    return null;
  }
};

// const getCookies = (key:string) => {
//   const user = Cookies.get('cinemaWallaUser')?JSON.parse(window.atob(Cookies.get('cinemaWallaUser'))):{'token':''};
//   try {
//     return user[key];
//   } catch (err) {
//     return null;
//   }
// };

const setItem = (key, value, global=false) => {
  // const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
  const stringify = JSON.stringify(value);
  if(global){
    return localStorage.setItem(key, window.btoa(stringify));
  }else{
    return sessionStorage.setItem(key, window.btoa(stringify));
  }

};

const removeItem = (key, global=false) => {
  if(global){
    localStorage.removeItem(key);
  }else{
    sessionStorage.removeItem(key);
  }

};

export { getItem, setItem, removeItem };
