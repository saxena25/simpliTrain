import { DataService } from '../../dataService/dataService';
import actionTypes from './actionsTypes';

const { TEST_BEGIN, TEST_SUCCESS, TEST_ERR } = actionTypes; 

const sendTestimonialRequest = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: TEST_BEGIN});
      let response = await DataService.post(`testimonials` , data);
      if(await response.data.success){
        return dispatch({ type: TEST_SUCCESS, data:response.data.data});
      }else{
        return dispatch({ type: TEST_ERR, err:response.data.message});
      }
    } catch (err) {
      dispatch({ type: TEST_ERR, err:err});
    }
  };
};

const getTestimonialRequest = () => {
    return async (dispatch) => {
      try {
        dispatch({type: TEST_BEGIN});
        let response = await DataService.get(`testimonials`);
        if(await response.data.success){
          // console.log("Response Action Testimonial" , response.data);
          return dispatch({ type: TEST_SUCCESS, data:response.data});
        }else{
          // console.log("Response Action Testimonial error" , response);
          return dispatch({ type: TEST_ERR, err:response.data.message});
        }
      } catch (err) {
        dispatch({ type: TEST_ERR, err:err});
      }
    };
  };



export { sendTestimonialRequest , getTestimonialRequest };
