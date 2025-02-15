import React from "react";
import EducationCard from "./EducationCard";
import { Drawer, FloatingTextField, Spinner } from "../../../components/ui-components";
import { Button } from "../../../components/ui-components";
import { useState } from "react";
import { DropDownField } from "../../../components/ui-components";
import { addEducations, getEducations, updateEducations } from "../../../redux/educations/actionCreator";
import { useDispatch } from "react-redux";
import FloatingDatePicker from "../../../components/ui-components/FloatingDatePicker";
import moment from "moment";

function Education({ educations, degrees }) {
  const dispatch = useDispatch();
  const defaultData = new Date();
  const [open, setOpen] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [formState, setFormState] = useState({
    degree: "",
    college: "",
    fieldOfStudy: "",
    startDate: defaultData,
    endDate: defaultData,
  });
  // addEducations
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
    setFormState({
      id: item.id,
      degree: item.degreeId,
      college: item.collegeName,
      fieldOfStudy: item.fieldOfStudy,
      startDate: item.startDate,
      endDate: item.endDate,
    });
    setOpen(true);
  }

  const onFinish = async (e) => {
    e.preventDefault();
    console.log(formState);
    const newErrors = {};
    // updateEducations
    setFormSubmit(true);
    let reponse;
    if(formState.id){
      reponse = await dispatch(updateEducations(formState));
    }else{
      reponse = await dispatch(addEducations(formState));
    }
    console.log('reponse', reponse);
    if(reponse && reponse.type === "ADD_EDUCATIONS_SUCCESS"){
      setFormSubmit(false);
      dispatch(getEducations());
      setOpen(false);
      setFormState({
        degree: "",
        college: "",
        fieldOfStudy: "",
        startDate: defaultData,
        endDate: defaultData,
      });
    }else{
      setFormSubmit(false);
    }
  };

  const openFormModal = () => {
    setFormState({
      degree: "",
      college: "",
      fieldOfStudy: "",
      startDate: defaultData,
      endDate: defaultData,
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
        <h3 className="mb-8 font-bold text-lg">Education</h3>
        <div className="bg-white px-6 py-6 rounded-xl">
          <div className="flex flex-col gap-4">
            {
              educations.map((item, index)=>(
                <EducationCard key={index} item={item} editAction={editAction} />
              ))
            }
          </div>
        </div>
      </div>

      <Drawer open={open} onClose={setOpen} title="Add Education">
        <form
          onSubmit={onFinish}
          method="POST"
          className="flex flex-col justify-between h-full w-96 m-auto mt-6">
          {/* <FloatingLabel variant="filled" className='h-16 mb-1 pl-4 pr-4 w-full bg-input-background border-0 text-input-text placeholder-transparent rounded-xl' label="Email ID / Phone Number" /> */}
          <div className="flex flex-col justify-center">
            <DropDownField
              options={degrees}
              label="DEGREE"
              name={"degree"}
              id={"degree"}
              onChange={handleChange}
              placeholder="degree"
              error={""}
              value={formState.degree}
            />
            <FloatingTextField
              label="COLLEGE"
              type="text"
              value={formState.college}
              onChange={handleChange}
              name={"college"}
              id={"college"}
              // placeholder="demo@gmail.com"
            />
            <FloatingTextField
              label="FIELD OF STUDY"
              type="text"
              value={formState.fieldOfStudy}
              onChange={handleChange}
              name={"fieldOfStudy"}
              id={"fieldOfStudy"}
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
            {/* <FloatingTextField
              label="START DATE"
              type="date"
              value={formState.startDate}
              onChange={handleChange}
              name={"startDate"}
              id={"startDate"}
            /> */}
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
          </div>
          <Button type='submit' color='primary' variant='solid' className={`m-auto my-6 ${formSubmit?'w-20':'w-52'}`} rounded={formSubmit?true:false}>{formSubmit?<Spinner className={''} color={'white'} />:formState.id?'Update':'ADD'}</Button>
        </form>
      </Drawer>

    </>
  );
}

export default Education;
