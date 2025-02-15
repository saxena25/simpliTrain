// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from "../../dataService/dataService";
import actiontyps from "./actionsTypes";
import { setItem } from "../../utils/localStorageControl";
import { data } from "autoprefixer";
const {
  VISIT_BEGIN,
  VISIT_SUCCESS,
  VISIT_ERR,
  HOME_BEGIN,
  HOME_SUCCESS,
  HOME_ERR,
} = actiontyps;

const getHomeFaqs = () =>{
  return async (dispatch) =>{
    try {
      dispatch({type: HOME_BEGIN});
      let response = await DataService.get(`faqs/categories/fetch/category/1ffc1bb7-0b6f-4d2c-b29c-d553711a452f`);
      if(await response.data.success){
        return dispatch({type: HOME_SUCCESS, data: response?.data.data});
      }else{
        return dispatch({type: HOME_ERR, data: response.data.message})
      }
    } catch (error) {
      return dispatch({type: HOME_ERR, err: error?.message});
    }
  }
}

const getAllCounts = () =>{
  return async (dispatch)=>{
    try {
      dispatch({type: HOME_BEGIN});
      let response = await DataService.get(`home/counts`);
      if(await response.data.success){
        return dispatch({type: HOME_SUCCESS, data: response?.data.data});
      }else{
        return dispatch({type: HOME_ERR, data: response?.data.message})
      }
    } catch (error) {
      return dispatch({type: HOME_ERR, err: error?.message});
    }
  }
}

const getVISIT = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: VISIT_BEGIN });
      let response = await DataService.get(`coursecategories`);
      // console.log('response.data', response.data);
      if (await response.data.success) {
        return dispatch({ type: VISIT_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: VISIT_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: VISIT_ERR, err: err });
    }
  };
};

const getFeaturedCourses = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: HOME_BEGIN });
      let response = await DataService.get(`home/featured-courses`);
      // console.log("Redux Featured Courses: ", response);
      if (await response.data.success) {
        return dispatch({ type: HOME_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: HOME_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: HOME_ERR, err: err });
    }
  };
};

const getNewAddedCourses = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: HOME_BEGIN });
      let response = await DataService.get(`home/new-added-courses`);
      if (await response.data.success) {
        return dispatch({ type: HOME_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: HOME_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: HOME_ERR, err: err });
    }
  };
};

const getPopularCourses = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: HOME_BEGIN });
      let response = await DataService.get(`home/popular-courses`);
      if (await response.data.success) {
        return dispatch({ type: HOME_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: HOME_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: HOME_ERR, err: err });
    }
  };
};

const setCourseVisit = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: VISIT_BEGIN });
      let postData = {
        userId: data.userId,
        courseId: data.courseId,
      };
      // console.log("Request ", postData);
      let response = await DataService.post(`home/visit-course`, postData);
      // console.log('response.data', response.data);
      if (await response.data) {
        return dispatch({ type: VISIT_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: VISIT_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: VISIT_ERR, err: err });
    }
  };
};

const getOneOnOneCourses = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: HOME_BEGIN });
      let response = await DataService.get(`home/top-one-on-one`);
      // console.log("Redux Response OneOnOne: ", response);
      if (await response.data.success) {
        // console.log("redux Success Response")
        return dispatch({ type: HOME_SUCCESS, data: response.data.data });
      } else {
        // console.log("redux Error 1 Response")
        return dispatch({ type: HOME_ERR, err: response.data.message });
      }
    } catch (error) {
      // console.log("redux Final Error Response")
      dispatch({ type: HOME_ERR, err: error.message });
    }
  };
};

const getFreeCourses = () =>{
  return async (dispatch)=>{
    try {
      dispatch({type: HOME_BEGIN});
      const response = await DataService.get(`batch/free`);
      if(await response?.data?.success){
        return dispatch({type: HOME_SUCCESS, data: response?.data?.data});
      }else{
        return dispatch({type: HOME_ERR, err: response?.data?.message});
      }
    } catch (error) {
      return dispatch({type: HOME_ERR, err: error?.message});
    }
  }
}

const getTopInstructors = () =>{
  return async (dispatch) =>{
    try {
      dispatch({type: HOME_BEGIN});
      let response = await DataService.get(`instructor/top`);
      // console.log("Redux Top Instructor: ", response);
      if(await response.data.success){
        return dispatch({type: HOME_SUCCESS, data: response.data.data});
      }else{
        return dispatch({type: HOME_ERR, err: response.data.message});
      }
    } catch (error) {
      return dispatch({type: HOME_ERR, err: error.message});
    }
  }
}

const getTrendingCourses = () =>{
  return async (dispatch) =>{
    try {
      dispatch({type: HOME_BEGIN});
      let response = await DataService.get(`home/trending-courses`);
      if(await response.data.success){
        return dispatch({type: HOME_SUCCESS, data: response.data.data});
      }else{
        return dispatch({type: HOME_ERR, err: response.data.message});
      }
    } catch (error) {
      return dispatch({type: HOME_ERR, err: error.message});
    }
  }
}

export {
  setCourseVisit,
  getFeaturedCourses,
  getNewAddedCourses,
  getPopularCourses,
  getOneOnOneCourses,
  getTopInstructors,
  getHomeFaqs,
  getAllCounts,
  getFreeCourses,
  getTrendingCourses
};
