import React, { useDebugValue } from "react";
import WorkExprienceCard from "./WorkExprienceCard";
import { Drawer, DropDownField, FloatingTextField, Spinner } from "../../../components/ui-components";
import { Dialog, DialogPanel, DialogTitle, Field } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components/ui-components";
import { useState } from "react";
import { addWorkExprience, getWorkExprience, updateWorkExprience } from "../../../redux/work_exprience/actionCreator";
import { useDispatch } from "react-redux";
import FloatingDatePicker from "../../../components/ui-components/FloatingDatePicker";

function WorkExperience({ workExpriences, employmentTypes, industries }) {
  const dispatch = useDispatch();
  const defaultData = new Date();
  const [open, setOpen] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    company: "",
    startDate: defaultData,
    endDate: defaultData,
    employmentType: "",
    industry: "",
    location: "",
  });
  // console.log('workExpriences', workExpriences);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (value, key) => {
    console.log(value, key);
    setFormState({
      ...formState,
      [key]: value.startDate,
    });
  }

  const editAction = (item) => {
    // item
    setFormState({
      id: item.id,
      title: item.job_title,
      company: item.company_name,
      startDate: item.start_date,
      endDate: item.end_date,
      employmentType: item.employment_type,
      industry: item.industry,
      location: item.location,
    });
    setOpen(true);
  }

  const onFinish = async (e) => {
    e.preventDefault();
    console.log(formState);
    const newErrors = {};
    setFormSubmit(true);
    let reponse;
    if(formState.id){
      reponse = await dispatch(updateWorkExprience(formState));
    }else{
      reponse = await dispatch(addWorkExprience(formState));
    }
    console.log('reponse', reponse);
    if(reponse && reponse.type === "ADD_WORK_EXPRIENCE_SUCCESS"){
      setFormSubmit(false);
      dispatch(getWorkExprience());
      setOpen(false);
      
    }else{
      setFormSubmit(false);
    }
  };

  const openFormModal = () => {
    setFormState({
      title: "",
      company: "",
      startDate: defaultData,
      endDate: defaultData,
      employmentType: "",
      industry: "",
      location: "",
    });
    setOpen(true)
  }

  return (
    <>
      <div className="relative">
        <button
          className="border bg-[#292D32] text-white text-base border-gray-300 px-4 py-2 rounded-full absolute right-6 top-0 w-22 transform transition duration-300 hover:scale-110"
          onClick={() => openFormModal()}>
          ADD
        </button>
        <h3 className="mb-8 font-bold text-lg">Add Work Exprience</h3>

        <div className="bg-white px-6 py-6 rounded-xl">
          <div className="flex flex-col gap-4">
            {
              workExpriences.map((item, index)=>(
                <WorkExprienceCard key={index} item={item} editAction={editAction} />
              ))
            }
          </div>
        </div>
      </div>

      <Drawer open={open} onClose={setOpen} title="Add Work Exprience">
        <form
          onSubmit={onFinish}
          method="POST"
          className="flex flex-col justify-between h-full w-96 m-auto mt-6">
          {/* <FloatingLabel variant="filled" className='h-16 mb-1 pl-4 pr-4 w-full bg-input-background border-0 text-input-text placeholder-transparent rounded-xl' label="Email ID / Phone Number" /> */}

          <div className="flex flex-col justify-center">
            <FloatingTextField
              label="TITLE"
              type="text"
              onChange={handleChange}
              value={formState.title}
              name={"title"}
              id={"title"}
              // placeholder=""
              // className="w-full"
            />
            <FloatingTextField
              label="COMPANY NAME"
              type="text"
              value={formState.company}
              onChange={handleChange}
              name={"company"}
              id={"company"}
              // placeholder="demo@gmail.com"
            />
            <FloatingDatePicker 
              label="START DATE"
              name={"startDate"}
              id={"startDate"}
              value={{
                startDate: formState.startDate, 
                endDate: formState.startDate
              }} 
              onChange={handleDateChange}
            /> 
            
            <FloatingDatePicker 
              label="END DATE"
              name={"endDate"}
              id={"endDate"}
              value={{
                startDate: formState.endDate, 
                endDate: formState.endDate
              }} 
              onChange={handleDateChange}
            />
            <DropDownField
              options={employmentTypes}
              label="EMPLOYMENT TYPE"
              name={"employmentType"}
              id={"employmentType"}
              onChange={handleChange}
              placeholder="Employment Type"
              error={""}
              value={formState.employmentType}
            />
            <DropDownField
              options={industries}
              label="INDUSTRY"
              name={"industry"}
              id={"industry"}
              onChange={handleChange}
              placeholder="industry"
              error={""}
              value={formState.industry}
            />
            <FloatingTextField
              label="LOCATION"
              type="text"
              value={formState.location}
              onChange={handleChange}
              name={"location"}
              id={"location"}
              // placeholder="demo@gmail.com"
            />
          </div>
          <Button type='submit' color='primary' variant='solid' className={`m-auto my-6 ${formSubmit?'w-20':'w-52'}`} rounded={formSubmit?true:false}>{formSubmit?<Spinner className={''} color={'white'} />:formState.id?'Update':'ADD'}</Button>
          
        </form>
      </Drawer>
    </>
  );
}

export default WorkExperience;
