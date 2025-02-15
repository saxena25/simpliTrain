import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import { Drawer } from "../../../components/ui-components";
import rightArrow from "../../../assets/svgs/rightArrow.svg";
import { checkIsMobile } from "../../../utils/helpers";
import MobDrawer from "../../../components/ui-components/MobDrawer";
import { useDispatch } from "react-redux";
import { updateSettings } from "../../../redux/settings/actionCreator";

function Remider({ userSettings }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [checkedStateData, setCheckedStateData] = useState({
    class_start_times: userSettings?.reminders?.class_start_times || false,
    rmd_installment_payments:
      userSettings?.reminders?.rmd_installment_payments || false,
    rmd_upcoming_assignments:
      userSettings?.reminders?.rmd_upcoming_assignments || false,
    rmd_instructor_feedback_grades:
      userSettings?.reminders?.rmd_instructor_feedback_grades || false,
  });
  // const [enabled, setEnabled] = useState(false);
  const isMobile = checkIsMobile();
  // console.log("Reminder userSettings: ", userSettings);

  const handleChange = async (fieldName, newValue) => {
    setCheckedStateData((prevState) => {
      const updatedState = {
        ...prevState,
        [fieldName]: newValue,
      };
      handleUpdate(updatedState);
      return updatedState;
    });
  };

  const handleUpdate = async (updatedState) => {
    let formState = {
      reminders: updatedState,
    };

    try {
      let response = await dispatch(updateSettings(formState));
    } catch (error) {
      console.log("Error Updating Reminder", error);
    }
  };

  return (
    <>
      <div
        className="w-full flex flex-row justify-between items-start transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mt-4 md:mt-8 border-b pb-4 md:border-none md:pb-0"
        onClick={() => setOpen(true)}>
        <div className="w-full flex flex-row justify-between gap-2">
          <p className="text-base text-primary">Reminders</p>
          <img src={rightArrow} alt="" />
        </div>
      </div>

      {isMobile ? (
        <MobDrawer open={open} onClose={setOpen} title="Reminders">
          <div className="flex flex-col gap-5 my-5 ">
            <div className="w-full flex flex-row justify-between gap-4 border-b pb-4">
              <p className="text-lg text-primary">Class start times</p>
              <Switch
                checked={checkedStateData.class_start_times}
                onChange={handleChange}
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
            <div className="w-full flex flex-row justify-between gap-4 border-b pb-4">
              <p className="text-lg text-primary">
                Notify users of upcoming installment payments
              </p>
              <Switch
                checked={checkedStateData.rmd_installment_payments}
                onChange={handleChange}
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
            <div className="w-full flex flex-row justify-between gap-4 border-b pb-4">
              <p className="text-lg text-primary">
                Upcoming assignments or tasks
              </p>
              <Switch
                checked={checkedStateData.rmd_upcoming_assignments}
                onChange={handleChange}
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
            <div className="w-full flex flex-row justify-between gap-4 border-b pb-4">
              <p className="text-lg text-primary">
                Instructors feedback or grades
              </p>
              <Switch
                checked={checkedStateData.rmd_instructor_feedback_grades}
                onChange={handleChange}
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
          </div>
        </MobDrawer>
      ) : (
        <Drawer open={open} onClose={setOpen} title="Reminders">
          <div className="flex flex-col gap-5 my-5 mx-5">
            <div className="w-full flex flex-row justify-between gap-4 ">
              <p className="text-lg text-primary">Class start times</p>
              <Switch
                checked={checkedStateData.class_start_times}
                onChange={(newValue) =>
                  handleChange("class_start_times", newValue)
                }
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
            <div className="w-full flex flex-row justify-between gap-4 ">
              <p className="text-lg text-primary">
                Notify users of upcoming installment payments
              </p>
              <Switch
                checked={checkedStateData.rmd_installment_payments}
                onChange={(newValue) =>
                  handleChange("rmd_installment_payments", newValue)
                }
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
            <div className="w-full flex flex-row justify-between gap-4 ">
              <p className="text-lg text-primary">
                Upcoming assignments or tasks
              </p>
              <Switch
                checked={checkedStateData.rmd_upcoming_assignments}
                onChange={(newValue) =>
                  handleChange("rmd_upcoming_assignments", newValue)
                }
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
            <div className="w-full flex flex-row justify-between gap-4 ">
              <p className="text-lg text-primary">
                Instructors feedback or grades
              </p>
              <Switch
                checked={checkedStateData.rmd_instructor_feedback_grades}
                onChange={(newValue) =>
                  handleChange("rmd_instructor_feedback_grades", newValue)
                }
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
}

export default Remider;
