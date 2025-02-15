import React from "react";
import { useState } from "react";
import MobDrawer from "../../../../components/ui-components/MobDrawer";
import add from "../../../../assets/svgs/add.svg";
import { Button, DropDownField } from "../../../../components/ui-components";
import MobFloatingTextField from "../../../../components/ui-components/MobFloatingTextField";
import { useDispatch } from "react-redux";
import {
  addEducations,
  getEducations,
  updateEducations,
} from "../../../../redux/educations/actionCreator";
import EducationCard from "../EducationCard";
import FloatingDatePicker from "../../../../components/ui-components/FloatingDatePicker";

function MobEducation({ educations, degrees }) {
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
    setFormState({
      id: item.id,
      degree: item.degreeId,
      college: item.collegeName,
      fieldOfStudy: item.fieldOfStudy,
      startDate: item.startDate,
      endDate: item.endDate,
    });
    setOpen(true);
  };

  const onFinish = async (e) => {
    e.preventDefault();
    console.log(formState);
    const newErrors = {};
    // updateEducations
    setFormSubmit(true);
    let response;
    if (formState.id) {
      response = await dispatch(updateEducations(formState));
    } else {
      response = await dispatch(addEducations(formState));
    }
    console.log("reponse", response);
    if (response && response.type === "ADD_EDUCATIONS_SUCCESS") {
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
    } else {
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
    setOpen(true);
  };

  return (
    <>
      <div className="relative bg-white rounded-xl px-6 py-6">
        <button
          className="border  border-gray-300 px-2 py-1 rounded-full absolute right-4 top-6"
          onClick={() => openFormModal()}>
          <p className="text-sm text-[#3B4350] font-medium flex flex-row gap-1 items-center justify-between">
            <span>ADD</span> <img src={add} alt="" />
          </p>
        </button>
        <h3 className="mb-8 font-bold text-lg">Education</h3>

        <div className="  ">
          <div className="flex flex-col gap-4">
            {educations.map((item, index) => (
              <EducationCard key={index} item={item} editAction={editAction} />
            ))}
          </div>
        </div>
      </div>

      <MobDrawer open={open} onClose={setOpen} title="Add Education">
        <form
          onSubmit={onFinish}
          method="POST"
          className="w-full flex flex-col justify-between h-full px-5 m-auto mt-6">
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
            <MobFloatingTextField
              label="COLLEGE"
              type="text"
              value={formState.college}
              onChange={handleChange}
              name={"college"}
              id={"college"}
              // placeholder="demo@gmail.com"
            />
            <MobFloatingTextField
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
                endDate: formState.startDate,
              }}
              onChange={handleDateChange}
            />
            Mob
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
          </div>

          <Button
            type="submit"
            color="primary"
            variant="solid"
            className="w-full m-auto my-6">
            ADD
          </Button>
        </form>
      </MobDrawer>
    </>
  );
}

export default MobEducation;
