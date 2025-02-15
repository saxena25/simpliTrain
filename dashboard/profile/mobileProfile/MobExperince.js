import React from "react";
import { useState } from "react";
import MobDrawer from "../../../../components/ui-components/MobDrawer";
import add from "../../../../assets/svgs/add.svg";
import MobFloatingTextField from "../../../../components/ui-components/MobFloatingTextField";
import {
  Button,
  DropDownField,
  Spinner,
} from "../../../../components/ui-components";
import { useDispatch } from "react-redux";
import {
  addWorkExprience,
  getWorkExprience,
  updateWorkExprience,
} from "../../../../redux/work_exprience/actionCreator";
import WorkExprienceCard from "../WorkExprienceCard";
import FloatingDatePicker from "../../../../components/ui-components/FloatingDatePicker";

function MobExperince({ workExpriences, employmentTypes, industries }) {
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
  };

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
  };

  const onFinish = async (e) => {
    e.preventDefault();
    console.log(formState);
    const newErrors = {};
    setFormSubmit(true);
    let response;
    if (formState.id) {
      response = await dispatch(updateWorkExprience(formState));
    } else {
      response = await dispatch(addWorkExprience(formState));
    }
    console.log("response", response);
    if (response && response.type === "ADD_WORK_EXPRIENCE_SUCCESS") {
      setFormSubmit(false);
      dispatch(getWorkExprience());
      setOpen(false);
    } else {
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
    setOpen(true);
  };

  return (
    <>
      <div className="relative bg-white rounded-xl px-6 py-6 mb-4">
        <button
          className="border  border-gray-300 px-2 py-1 rounded-full absolute right-4 top-6"
          onClick={() => openFormModal()}>
          <p className="text-sm text-[#3B4350] font-medium flex flex-row gap-1 items-center justify-between">
            <span>ADD</span> <img src={add} alt="" />
          </p>
        </button>
        <h3 className="mb-8 font-bold text-lg">Work Experience</h3>

        <div className="  ">
          <div className="flex flex-col gap-4">
            {workExpriences.map((item, index) => (
              <WorkExprienceCard
                key={index}
                item={item}
                editAction={editAction}
              />
            ))}
          </div>
        </div>
      </div>

      <MobDrawer open={open} onClose={setOpen} title="Add Work Experience">
        <form
          onSubmit={onFinish}
          method="POST"
          className="w-full px-5 flex flex-col justify-between h-full m-auto mt-6">
          {/* <FloatingLabel variant="filled" className='h-16 mb-1 pl-4 pr-4 w-full bg-input-background border-0 text-input-text placeholder-transparent rounded-xl' label="Email ID / Phone Number" /> */}

          <div className="flex flex-col justify-center">
            <MobFloatingTextField
              label="TITLE"
              type="text"
              onChange={handleChange}
              value={formState.title}
              name={"title"}
              id={"title"}
              // placeholder=""
              // className="w-full"
            />
            <MobFloatingTextField
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
                endDate: formState.startDate,
              }}
              onChange={handleDateChange}
            />

            <FloatingDatePicker
              label="END DATE"
              name={"endDate"}
              id={"endDate"}
              value={{
                startDate: formState.endDate,
                endDate: formState.endDate,
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
            <MobFloatingTextField
              label="LOCATION"
              type="text"
              value={formState.location}
              onChange={handleChange}
              name={"location"}
              id={"location"}
              // placeholder="demo@gmail.com"
            />
          </div>
          <Button
            type="submit"
            color="primary"
            variant="solid"
            className={`m-auto my-6 ${formSubmit ? "w-20" : "w-52"}`}
            rounded={formSubmit ? true : false}>
            {formSubmit ? (
              <Spinner className={""} color={"white"} />
            ) : formState.id ? (
              "Update"
            ) : (
              "ADD"
            )}
          </Button>
        </form>
      </MobDrawer>
    </>
  );
}

export default MobExperince;
