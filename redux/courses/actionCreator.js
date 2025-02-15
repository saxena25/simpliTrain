// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from "../../dataService/dataService";
import actiontyps from "./actionsTypes";
import { setItem } from "../../utils/localStorageControl";
const {
  COURSES_BEGIN,
  COURSES_SUCCESS,
  COURSES_ERR,
  COURSE_BEGIN,
  COURSE_SUCCESS,
  COURSE_ERR,
  COURSE_CREATE_BEGIN,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_ERR,
  BATCH_BEGIN,
  BATCH_SUCCESS,
  BATCH_ERR,
  BATCH_CREATE_BEGIN,
  BATCH_CREATE_SUCCESS,
  BATCH_CREATE_ERR,
} = actiontyps;

const getCourses = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSES_BEGIN });
      let postData = {
        searchParams: {
          courseLevel: data.courseLevel || "",
          averageRating: data.rating || "",
          courseBatchVenueTypeFilter: data.batchMode || "",
          categoryID: data.categoryID || "",
          subCategoryID: data.subCategoryID || "",
        },
        pageNum: 1,
        pageSize: 10,
        sortBy: "id", //id = all
      };
      // console.log("Redux Get Courses: ", data);
      // console.log("Redux Courses postData: ", postData);
      let response = await DataService.post(`course/search`, postData);
      console.log("redux response", response);
      if (response.data?.success) {
        return dispatch({ type: COURSES_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: COURSES_ERR, err: response.data?.message });
      }
    } catch (err) {
      dispatch({ type: COURSES_ERR, err: err?.message });
      console.log("Redux Axios Error", err);
    }
  };
};

const getCourseCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSES_BEGIN });
      let response = await DataService.get(`coursecategories`);
      console.log("redux Categories 1: ", response);
      if (response.data.success) {
        console.log("redux Categories 2: ", response.data.data);
        return dispatch({ type: COURSES_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: COURSE_ERR, err: response.data.message });
      }
    } catch (error) {
      return dispatch({ type: COURSE_ERR, err: error });
    }
  };
};

const getSubCategoryById = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSES_BEGIN });
      let response = await DataService.get(
        `coursesubcategories/all/${data.id}`
      );
      if (response.data?.success) {
        return dispatch({ type: COURSES_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: COURSE_ERR, err: response.data?.message });
      }
    } catch (error) {
      return dispatch({ type: COURSE_ERR, err: error?.message });
    }
  };
};

const addToWishlist = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSES_BEGIN });
      let formData = {
        userId: data.userId,
        courseId: data.courseId,
      };
      console.log("Redux WishList Post: ", formData);
      let response = await DataService.post(`wishlist/user`, formData);
      if (response?.data?.success) {
        return dispatch({ type: COURSES_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: COURSE_ERR, err: response.data?.message });
      }
    } catch (error) {
      return dispatch({ type: COURSE_ERR, err: error?.message });
    }
  };
};

const getCourseReviewById = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSES_BEGIN });
      let response = await DataService.get(`coursereview/get/${data.courseId}`);
      if (response.data?.success) {
        return dispatch({ type: COURSES_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: COURSES_ERR, err: response?.message });
      }
    } catch (error) {
      return dispatch({ type: COURSES_ERR, err: error?.message });
    }
  };
};

const sendQuestion = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSES_BEGIN });
      let formData = {
        userId: data.userId,
        courseId: data.courseId,
        question: data.question,
      };
      let response = await DataService.post(`coursequestionanswer`, formData);
      if (response?.data?.success) {
        return dispatch({ type: COURSES_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: COURSES_ERR, err: response?.message });
      }
    } catch (error) {
      return dispatch({ type: COURSES_ERR, err: error?.message });
    }
  };
};

const getCourseById = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSE_BEGIN });
      let response = await DataService.get(`course/${data.courseId}`);
      if (await response.data?.success) {
        return dispatch({ type: COURSE_SUCCESS, data: response.data?.data });
      } else {
        return dispatch({ type: COURSE_ERR, err: response.data?.message });
      }
    } catch (err) {
      dispatch({ type: COURSE_ERR, err: err?.message });
    }
  };
};

const getSimilarCourseById = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSE_BEGIN });
      let response = await DataService.get(`course/similar/${data.courseId}`);
      if (await response.data.success) {
        return dispatch({ type: COURSE_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: COURSE_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: COURSE_ERR, err: err });
    }
  };
};

const getBatchByCourseId = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSE_BEGIN });
      let response = await DataService.get(
        `batch/coursebatches/${data.courseId}`
      );
      if (await response.data.success) {
        return dispatch({ type: COURSE_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: COURSE_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: COURSE_ERR, err: err });
    }
  };
};

const addCourses = (data) => {
  return async (dispatch) => {
    try {
      console.log("datadata", data);

      const formData = new FormData();
      Object.keys(data).forEach((element) => {
        console.log("data[element]", data[element], element);
        if (data[element]) {
          if (element === "image" && data[element] instanceof File) {
            formData.append(element, data[element]);
          } else {
            formData.append(element, data[element]);
          }
        }
      });
      console.log("formData", formData);
      dispatch({ type: COURSE_CREATE_BEGIN });
      let response = await DataService.post("course", formData, {
        "Content-Type": "multipart/form-data",
      });
      // console.log('responseresponse', response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: COURSE_CREATE_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: COURSE_CREATE_ERR,
          err: response.data.message,
        });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: COURSE_CREATE_ERR, err: err });
    }
  };
};

const addBatch = (data) => {
  return async (dispatch) => {
    try {
      console.log("datadata", data);

      const formData = new FormData();
      Object.keys(data).forEach((element) => {
        console.log("data[element]", data[element], element);
        if (data[element]) {
          if (element === "image" && data[element] instanceof File) {
            formData.append(element, data[element]);
          } else {
            formData.append(element, data[element]);
          }
        }
      });
      console.log("formData", formData);
      dispatch({ type: BATCH_CREATE_BEGIN });
      let response = await DataService.post("batch", formData, {
        "Content-Type": "multipart/form-data",
      });
      // console.log('responseresponse', response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: BATCH_CREATE_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: BATCH_CREATE_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: BATCH_CREATE_ERR, err: err });
    }
  };
};

const updateCourses = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSES_BEGIN });
      let postData = {};
      if (data.type == "email") {
        postData = {
          email: data.username,
          type: data.type, // phone
          role: "LEARNER", //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
        };
      } else {
        postData = {
          phone: data.username,
          countryCode: data.phone_code,
          type: data.type, // phone
          role: "LEARNER", //"LEARNER", "INSTRUCTOR", "VENUEPROVIDER", "ADMIN", "SUPERADMIN"
        };
      }

      let response = await DataService.post("user/check", postData);
      // console.log('responseresponse', response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: COURSES_SUCCESS,
          data: { ...response.data.data, newUser: response.data.create },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: COURSES_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: COURSES_ERR, err: err });
    }
  };
};

const getBatchId = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: BATCH_BEGIN });
      // console.log("Redux Get Batch: ", data);
      let response = await DataService.get(`batch/${data.batchId}`);
      if (await response.data.success) {
        return dispatch({ type: BATCH_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: BATCH_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: BATCH_ERR, err: err });
    }
  };
};

const getBatchParticipants = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: BATCH_BEGIN });
      let response = await DataService.get(`batch/get/userparticipants`);
      if (await response.data.success) {
        return dispatch({ type: BATCH_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: BATCH_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: BATCH_ERR, err: err });
    }
  };
};

const getOtherCoursesByInstructor = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COURSES_BEGIN });
      let postData = {
        instructorId: data.instructorId,
        courseId: data.courseId,
      };
      console.log("Redux Get Other Courses: ", postData);
      let response = await DataService.post(`course/other-courses`, postData);
      if (response.data?.success) {
        return dispatch({ type: COURSES_SUCCESS, data: response.data.data });
      } else {
        return dispatch({ type: COURSES_ERR, err: response?.message });
      }
    } catch (error) {
      return dispatch({ type: COURSES_ERR, err: error?.message });
    }
  };
};

// a9617c11-dd73-416f-a170-ae7525e95bf6/63151542-fb94-4198-b346-874a7c4f3dd6

export {
  getCourses,
  addCourses,
  addBatch,
  updateCourses,
  getCourseById,
  getSimilarCourseById,
  getBatchByCourseId,
  addToWishlist,
  getCourseReviewById,
  getCourseCategory,
  getSubCategoryById,
  getBatchId,
  getBatchParticipants,
  sendQuestion,
  getOtherCoursesByInstructor,
};
