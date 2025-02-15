// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from '../../dataService/dataService';
import actiontyps from './actionsTypes';
import { setItem } from '../../utils/localStorageControl';
const { INSTRUCTOR_COURSE_LISTING_BEGIN, INSTRUCTOR_COURSE_LISTING_SUCCESS, INSTRUCTOR_COURSE_LISTING_ERR } = actiontyps; 

const getInstructorCourses = () => {
  return async (dispatch) => {
    try {
      console.log("redux running")
      dispatch({type: INSTRUCTOR_COURSE_LISTING_BEGIN});
      let response = await DataService.get(`course`);
      console.log("Redux Get Instructor Courses", response);
      if(await response.data.success){
        return dispatch({ type: INSTRUCTOR_COURSE_LISTING_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: INSTRUCTOR_COURSE_LISTING_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: INSTRUCTOR_COURSE_LISTING_ERR, err:err});
    }
  };
};

// const addINSTRUCTOR_COURSE_LISTING = (data) => {
//   return async (dispatch) => {
//     try {
//       dispatch({type: INSTRUCTOR_COURSE_LISTING_BEGIN});
//       let postData = {
//         name:data.skillName
//       }
      
//       let response = await DataService.post('skill', postData);
//       console.log('responseresponse', response);
//       if(await response.data.success){
//         // message.success({ content:  response.data.message, duration: 2 });
//         return dispatch({ type: INSTRUCTOR_COURSE_LISTING_SUCCESS, data:{...response.data.data}});
//       }else{
//         // message.error({ content:  response.data.message, duration: 2 });
//         return dispatch({ type: INSTRUCTOR_COURSE_LISTING_ERR, err:response.data.message});
//       }
//       // setTimeout(() => {
//       //   Cookies.set('logedIn', true);
//       //   return dispatch(loginSuccess(true));
//       // }, 1000);
//     } catch (err) {
//       dispatch({ type: INSTRUCTOR_COURSE_LISTING_ERR, err:err});
//     }
//   };
// };

// const updateINSTRUCTOR_COURSE_LISTING = (data) => {
//   return async (dispatch) => {
//     try {
//       dispatch({type: INSTRUCTOR_COURSE_LISTING_BEGIN});
//       let postData = {}
//       if(data.type == 'email'){
//         postData = {
//           email: data.username,
//           type: data.type, // phone
//           role:"LEARNER" //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
//         };
//       }else{
//         postData = {
//           phone:data.username,
//           countryCode:data.phone_code,
//           type: data.type, // phone
//           role:"LEARNER" //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
//         }
//       }
      
//       let response = await DataService.post('user/check', postData);
//       // console.log('responseresponse', response);
//       if(await response.data.success){
//         // message.success({ content:  response.data.message, duration: 2 });
//         return dispatch({ type: INSTRUCTOR_COURSE_LISTING_SUCCESS, data:{...response.data.data, newUser:response.data.create}});
//       }else{
//         // message.error({ content:  response.data.message, duration: 2 });
//         return dispatch({ type: INSTRUCTOR_COURSE_LISTING_ERR, err:response.data.message});
//       }
//       // setTimeout(() => {
//       //   Cookies.set('logedIn', true);
//       //   return dispatch(loginSuccess(true));
//       // }, 1000);
//     } catch (err) {
//       dispatch({ type: INSTRUCTOR_COURSE_LISTING_ERR, err:err});
//     }
//   };
// };


export { getInstructorCourses };
