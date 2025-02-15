import React from "react";
import { useState } from "react";
import { EditPencilTwo } from "../../../../components/icons";
import MobDrawer from "../../../../components/ui-components/MobDrawer";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { updateInterestedTopics } from "../../../../redux/profile/actionCreator";
import {
  Button,
  EditableTagField,
  Spinner,
} from "../../../../components/ui-components";

function MobTopics({ profile }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [userTopics, setUserTopics] = useState(
    profile?.learningGoals ? profile.learningGoals : []
  );

  const onFinish = async (e) => {
    e.preventDefault();
    setFormSubmit(true);
    console.log("userTopicsuserTopics", userTopics);
    let response = await dispatch(
      updateInterestedTopics({ topics: userTopics })
    );
    console.log("reponse", response);
    if (response && response.type === "PROFILE_SUCCESS") {
      setFormSubmit(false);
      setOpen(false);
    } else {
      setFormSubmit(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl relative pb-4">
        <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">
          Interested Topics
        </h3>
        <button
          className="border  border-gray-300 px-1 py-1 rounded-full absolute right-4 top-6 w-22 flex gap-2 justify-center items-center"
          onClick={() => setOpen(true)}>
          <p className="text-base ml-2">Edit</p>
          <EditPencilTwo color="black" />
        </button>
        <div className="flex flex-row px-6 mb-4 gap-1 flex-wrap">
          {profile.learningGoals
            ? profile.learningGoals.map((topic, index) => (
                <button
                  key={index}
                  className="border border-gray-200 px-2 py-1 h-fit rounded-3xl hover:bg-gray-300 text-sm transform transition duration-300 hover:scale-110">
                  {topic}
                </button>
              ))
            : null}
        </div>
      </div>

      <MobDrawer open={open} onClose={setOpen} title="Interested Topics">
        <div className="flex flex-col justify-between h-full">
          <EditableTagField
            name={"topics"}
            id={"topics"}
            placeholder={"Enter Topics"}
            values={userTopics}
            onChange={setUserTopics}
          />
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
      </MobDrawer>
    </>
  );
}

export default MobTopics;
