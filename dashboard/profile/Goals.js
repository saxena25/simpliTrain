import React from "react";
import { EditPencilTwo } from "../../../components/icons";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button, Drawer, Spinner } from "../../../components/ui-components";
import { updateGoals } from "../../../redux/profile/actionCreator";
import { useDispatch } from "react-redux";

function Goals({ profile, goals }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [goalsList, setGoalsList] = useState(goals || []);
  const [formSubmit, setFormSubmit] = useState(false);
  const [userTopics, setUserTopics] = useState(
    profile?.learningGoals ? profile.learningGoals : []
  );

  const handleCheckboxChange = (goalName) => {
    if (userTopics.includes(goalName)) {
      // Remove goal if already selected
      setUserTopics(userTopics.filter((name) => name !== goalName));
    } else {
      // Add goal if not already selected
      setUserTopics([...userTopics, goalName]);
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setFormSubmit(true);
    // console.log("userGoals :", userTopics);
    let response = await dispatch(updateGoals({ learningGoals: userTopics }));
    if (response && response.type === "PROFILE_SUCCESS") {
      setFormSubmit(false);
      setOpen(false);
    } else {
      setFormSubmit(false);
    }
  };

  return (
    <>
      <div className="border border-gray-200 rounded-xl my-4 relative">
        <h3 className="text-xl mx-6 mt-6 mb-6 font-semibold">Goals</h3>
        <button
          className="border bg-white border-gray-200 px-2 py-2 rounded-full absolute right-4 top-5 w-22 flex gap-2 justify-center items-center transform transition duration-300 hover:scale-110"
          onClick={() => setOpen(true)}>
          <p className="text-base ml-2">Edit</p>
          <EditPencilTwo color="black" />
        </button>
        <div className="mx-6 mb-4 flex flex-col gap-3">
          {profile?.learningGoals?.map((item, idx) => (
            <p key={idx} className="text-lg text-gray-500 font-medium">
              {item}
            </p>
          ))}
        </div>
      </div>

      <Drawer open={open} onClose={setOpen} title="Edit Goals">
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-6">
            {goalsList.map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  id={item.id}
                  name="notification-method"
                  type="checkbox"
                  checked={userTopics.includes(item.name)}
                  onChange={() => handleCheckboxChange(item.name)}
                  className="text-black rounded-md focus:border-black"
                />
                <label
                  htmlFor={item.id}
                  className="ml-3 block text-lg font-medium text-gray-900">
                  {item.name}
                </label>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={onFinish}
            color="primary"
            variant="solid"
            className={`my-4 m-auto text-2xl ${formSubmit ? "w-20" : "w-52"}`}
            rounded={formSubmit ? true : false}>
            {formSubmit ? <Spinner className={""} color={"white"} /> : "SAVE"}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default Goals;
