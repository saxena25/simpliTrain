import React, { useState } from "react";
// import { Button, FloatingTextField } from "../../components/ui-components";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Drawer } from "../../components/ui-components";
import { checkIsMobile } from "../../utils/helpers";
import MobDrawer from "../../components/ui-components/MobDrawer";
import { useDispatch } from 'react-redux';
import { sendInstructorSupportRequest , sendLearnerSupportRequest } from "../../redux/contactUs/actionCreator";

function Support({ onOpenChange }) {

  const dispatch = useDispatch();
  const [formLearnerState, setFormLearnerState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [formInstructorState, setFormInstructorState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const isMobile = checkIsMobile();
  // const [mobileOpen, setMobileOpen] = useState(false);

  const validateLearner = () => {
    const newErrors = {};
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Email validation
    if (!formLearnerState.firstName || !formLearnerState.lastName || !formLearnerState.email || !formLearnerState.message) {
        newErrors.username = 'Please enter all the information.';
    }else {
        if (!emailFormat.test(formLearnerState.email)) {
          newErrors.username = 'Please enter a valid email address.';
        } else{
       return true;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateInstructor = () => {
    const newErrors = {};
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Email validation
    if (!formInstructorState.firstName || !formInstructorState.lastName || !formInstructorState.email || !formInstructorState.message) {
        newErrors.username = 'Please enter all the information.';
    }else {
        if (!emailFormat.test(formInstructorState.email)) {
          newErrors.username = 'Please enter a valid email address.';
        } else{
       return true;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormLearnerState({
      ...formLearnerState,
      [e.target.name]: e.target.value,
    });
  };

  const handleInstructorChange = (e) => {
    setFormInstructorState({
      ...formInstructorState,
      [e.target.name]: e.target.value,
    });
  };

  const handleLearnerSubmit = async (e) => {
    e.preventDefault(); 
    const newErrors = {};
    if(validateLearner()){
      const data = { 
        first_name: formLearnerState.firstName,
        last_name: formLearnerState.lastName,
        email: formLearnerState.email,
        subject: `${formLearnerState.firstName} ${formLearnerState.lastName}`,
        message: formLearnerState.message,
        inquiryType:"Learner"
      }
      let response = await dispatch(sendLearnerSupportRequest(data));
      console.log('response', response);
      if(response && response.type === "CONTACT_SUCCESS"){
        if(response.data){
         console.log('Request Sent');
        }else{
          console.log('Something went wrong');
        }
      }else if(response && response.type === "AUTH_ERR"){
        newErrors.username = response.err;
      }else{
        newErrors.username = 'Something went wrong!!!';
      }
    }
  };
  
  const handleInstructorSubmit = async (e) => {
    e.preventDefault(); 
    const newErrors = {};
    if(validateInstructor()){
      const data = { 
        first_name: formInstructorState.firstName,
        last_name: formInstructorState.lastName,
        email: formInstructorState.email,
        subject: `${formInstructorState.firstName} ${formInstructorState.lastName}`,
        message: formInstructorState.message,
        inquiryType:"Instructor"
      }
      let response = await dispatch(sendInstructorSupportRequest(data));
      console.log('response', response);
      if(response && response.type === "CONTACT_SUCCESS"){
        if(response.data){
         console.log('Request Sent');
        }else{
          console.log('Something went wrong');
        }
      }else if(response && response.type === "AUTH_ERR"){
        newErrors.username = response.err;
      }else{
        newErrors.username = 'Something went wrong!!!';
      }
    }
  };

  return (
    <>
      <div
        className={`flex flex-col md:flex-row gap-16 justify-center my-40  `}>
        <div
          className={`bg-[#F7F7F7] max-w-md  h-48 rounded-2xl flex flex-col justify-center px-10 gap-2 ${
            isMobile ? "m-auto" : ""
          }`}>
          <p className="text-lg md:text-xl font-semibold text-[#282938]">
            Instructors Support
          </p>
          <p className="text-sm md:text-base text-[#282938]">
            Do you have a particular problem that needs to be solved quickly?
          </p>
          <button
            className={`text-sm px-5 py-2 bg-black text-white rounded-3xl w-32 ${
              isMobile ? "mt-3" : ""
            }`}
            onClick={() => setOpen(true)}>
            Send an Email
          </button>
        </div>

        <div className={`flex flex-col md:w-[38%] md:h-[654px] gap-4`}>
          <p className={`text-2xl md:text-xl font-medium ${isMobile ? "text-center" : ""}`}>Learner Support</p>
          <form
            onSubmit={handleLearnerSubmit}
            className="flex flex-col justify-between">
            <div className="pb-6 flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="" className="text-base text-gray-500">
                  First Name*
                </label>
                <input
                  type="text"
                  className="bg-[#F7F7F7] h-14 rounded-lg border-none"
                  name ='firstName'
                  value={formLearnerState.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-base text-gray-500">
                  Last Name*
                </label>
                <input
                  type="text"
                  className="bg-[#F7F7F7] h-14 rounded-lg border-none"
                  name ='lastName'
                  value={formLearnerState.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-base text-gray-500">
                  Email*
                </label>
                <input
                  type="email"
                  className="bg-[#F7F7F7] h-14 rounded-lg border-none"
                  name ='email'
                  value={formLearnerState.email}
                  onChange={handleChange}
                />
              </div>

              <div className="">
                <label htmlFor="comment" className="text-base text-gray-500">
                  Your Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full h-40 rounded-lg bg-[#F7F7F7] px-3 py-1.5 text-base text-gray-900 border-none  outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                  placeholder="Type..."
                  value={formLearnerState.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`md:self-end text-lg px-5 py-1 md:px-10 md:py-3 bg-[#000000] rounded-3xl text-white mt-4 ${isMobile ? "w-fit m-auto" : ""}`}>
              Send
            </button>
          </form>
        </div>
      </div>

      {isMobile ? (
        <MobDrawer open={open} onClose={setOpen} title="Instructor Support">
          <form
            onSubmit={handleInstructorSubmit}
            className="flex w-full m-auto flex-col justify-between">
            <div className="pb-6 flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="" className="text-base text-gray-500">
                  First Name*
                </label>
                <input
                  type="text"
                  className="bg-[#F7F7F7] h-14 rounded-lg border-none"
                  name= 'firstName'
                  value={formInstructorState.firstName}
                  onChange={handleInstructorChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-base text-gray-500">
                  Last Name*
                </label>
                <input
                  type="text"
                  className="bg-[#F7F7F7] h-14 rounded-lg border-none"
                  name='lastName'
                  value={formInstructorState.lastName}
                  onChange={handleInstructorChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-base text-gray-500">
                  Email*
                </label>
                <input
                  type="email"
                  name= 'email'
                  className="bg-[#F7F7F7] h-14 rounded-lg border-none"
                  value={formInstructorState.email}
                  onChange={handleInstructorChange}
                />
              </div>

              <div className="">
                <label htmlFor="comment" className="text-base text-gray-500">
                  Your Message*
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  className="block w-full h-32 rounded-lg bg-[#F7F7F7] px-3 py-1.5 text-base text-gray-900 border-none  outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                  placeholder="Type..."
                  value={formInstructorState.message}
                  onChange={handleInstructorChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-sm w-60 m-auto px-10 py-3 bg-[#000000] rounded-3xl text-white">
              Send
            </button>
          </form>
        </MobDrawer>
      ) : (
        <Drawer open={open} onClose={setOpen} title="Instructor Support">
          <form
            onSubmit={handleInstructorSubmit}
            className="flex max-w-md m-auto flex-col justify-between">
            <div className="pb-6 flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="" className="text-base text-gray-500">
                  First Name*
                </label>
                <input
                  type="text"
                  className="bg-[#F7F7F7] h-14 rounded-lg border-none"
                  name= 'firstName'
                  value={formInstructorState.firstName}
                  onChange={handleInstructorChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-base text-gray-500">
                  Last Name*
                </label>
                <input
                  type="text"
                  className="bg-[#F7F7F7] h-14 rounded-lg border-none"
                  name= 'lastName'
                  value={formInstructorState.lastName}
                  onChange={handleInstructorChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-base text-gray-500">
                  Email*
                </label>
                <input
                  type="email"
                  name= 'email'
                  className="bg-[#F7F7F7] h-14 rounded-lg border-none"
                  value={formInstructorState.email}
                  onChange={handleInstructorChange}
                />
              </div>

              <div className="">
                <label htmlFor="comment" className="text-base text-gray-500">
                  Your Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full h-40 rounded-lg bg-[#F7F7F7] px-3 py-1.5 text-base text-gray-900 border-none  outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                  placeholder="Type..."
                  value={formInstructorState.message}
                  onChange={handleInstructorChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-sm w-60 m-auto px-10 py-3 bg-[#000000] rounded-3xl text-white mt-4">
              Send
            </button>
          </form>
        </Drawer>
      )}
    </>
  );
}

export default Support;
