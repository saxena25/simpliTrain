// import Cookies from 'js-cookie';
// import { message } from 'antd';
import { DataService } from "../../dataService/dataService";
import actiontyps from "./actionsTypes";
import { setItem } from "../../utils/localStorageControl";
import { data } from "autoprefixer";
const { PROFILE_BEGIN, PROFILE_SUCCESS, PROFILE_ERR } = actiontyps;

const getProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      let response = await DataService.get(`user/profile`);
      // console.log('profile response', response);
      if ((await response.data) && response.data.user) {
        setItem("simplitrain_user", response.data.user);
        setItem("simplitrain_user_id", response.data.user.id);
        return dispatch({ type: PROFILE_SUCCESS, data: response.data.user });
      } else {
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err: err });
    }
  };
};

const updateProfile = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      // console.log("Profile Redux: ", data)
      let postData = {
        name: data.name,
        age_limit: data.age,
        gender: data.gender,
        onboarding: {
          addressLine1: data.onboarding.addressLine1,
          addressLine2: data.onboarding.addressLine2,
          city: data.onboarding.city,
          state: data.onboarding.state,
          country: data.onboarding.country,
          zipcode: data.onboarding.zipcode,
        },
      };
      console.log("Redux UpdateProfile: ", postData);
      let response = await DataService.put("user/profile", postData);
      console.log("response response", response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.user },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err: err });
    }
  };
};

const updateBio = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      let postData = {
        onboarding: {
          bio: data.bio,
        },
      };
      let response = await DataService.put("user/profile", postData);
      if (await response.data.success) {
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.user },
        });
      } else {
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err: err });
    }
  };
};

const updateProfilePhoto = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      let postData = {
        profileImage: data.profileImage,
      };
      let response = await DataService.put("user/profile", postData);
      if (await response.data.success) {
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.user },
        });
      } else {
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
    } catch (error) {
      dispatch({ type: PROFILE_ERR, err: error });
    }
  };
};

const updateInterestedTopics = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      // let postData = {
      //   learningGoals: data.topics
      // };
      // console.log("redux Topics :", data)
      let postData = {
        onboarding: [
          {
            intrestedTopics: data.topics,
          },
        ],
      };
      let response = await DataService.put("user/profile", postData);
      console.log("responseresponse", response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.user },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err: err });
    }
  };
};

const updateGoals = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      let postData = {
        learningGoals: data.learningGoals
      };
      let response = await DataService.put("user/profile", postData);
      console.log("responseresponse", response);
      if (await response.data.success) {
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.user },
        });
      } else {
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err: err });
    }
  };
};

const updateSocialLinks = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      let postData = {
        socialLinks: data.socialLinks,
      };
      let response = await DataService.put("user/profile", postData);
      console.log("responseresponse", response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.user },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err: err });
    }
  };
};

const UpdateInstructorRole = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      let postData = {
        id: data.userId,
        role: "INSTRUCTOR",
      };
      let response = await DataService.post("user/update-role", postData);
      console.log("responseresponse", response);
      if (await response.data.success) {
        // message.success({ content:  response.data.message, duration: 2 });
        setItem("simplitrain_user", response.data.data);
        setItem("simplitrain_user_id", response.data.data.id);
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        // message.error({ content:  response.data.message, duration: 2 });
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
    } catch (err) {
      dispatch({ type: PROFILE_ERR, err: err });
    }
  };
};

const getAllStates = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      // console.log("1 Redux: ", data)
      let postData = {
        country_id: data.id,
      };
      console.log("redux Get State: ", postData);
      let response = await DataService.post(`state/by-country`, postData);
      console.log("redux response states: ", response);
      if (await response.data.success) {
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
    } catch (error) {
      return dispatch({ type: PROFILE_ERR, err: error });
    }
  };
};

// existing user mobile otp send
const sendOtpMobile = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      let postData = {
        isExisting: true,
      };
      let response = await DataService.post(`user/send-otp`, postData);
      if (await response.data.success) {
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
    } catch (error) {
      return dispatch({ type: PROFILE_ERR, err: error });
    }
  };
};

// new user mobile otp send
const newUserMobileOtp = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      let postData = {
        mobile: data.mobile,
        countryCode: data.countryCode,
        isExisting: false,
      };
      let response = await DataService.post(`user/send-otp`, postData);
      if (await response.data.success) {
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
    } catch (error) {
      return dispatch({ type: PROFILE_ERR, err: error });
    }
  };
};

// New user verify number
const verifyNumber = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      let postData = {
        otp: data.otp,
      };
      let response = await DataService.post(`user/verify-otp`, postData);
      if (await response.data.success) {
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
    } catch (error) {
      return dispatch({ type: PROFILE_ERR, err: error });
    }
  };
};

// send Single Social links
const sendSocialLinks = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      let postData = {
        userId: data.id,
        platform: data.platform,
        link: data.link,
      };
      console.log("Redux Send Links: ", postData);
      let response = await DataService.post(`sociallink`, postData);
      if (await response.data.success) {
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
    } catch (error) {
      dispatch({ type: PROFILE_ERR, err: error });
    }
  };
};

//social multiple links send
const sendMultipleLinks = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_BEGIN });
      console.log("Redux multiple links:", data);
      let response = await DataService.post(`sociallink/user-links`, data);
      if (await response.data.success) {
        return dispatch({
          type: PROFILE_SUCCESS,
          data: { ...response.data.data },
        });
      } else {
        return dispatch({ type: PROFILE_ERR, err: response.data.message });
      }
    } catch (error) {
      return dispatch({ type: PROFILE_ERR, err: error });
    }
  };
};

export {
  getProfile,
  updateProfile,
  updateBio,
  updateInterestedTopics,
  updateSocialLinks,
  UpdateInstructorRole,
  getAllStates,
  sendSocialLinks,
  sendMultipleLinks,
  sendOtpMobile,
  newUserMobileOtp,
  verifyNumber,
  updateProfilePhoto,
  updateGoals
};
