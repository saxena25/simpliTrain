import React from "react";
import { EditPencilTwo } from "../../../components/icons";
import { useState } from "react";
import {
  Button,
  Drawer,
  EditableTagField,
  Spinner,
} from "../../../components/ui-components";
import { updateInterestedTopics } from "../../../redux/profile/actionCreator";
import { useDispatch } from "react-redux";

function Topics({ profile }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  // console.log('profile', profile);
  const [userTopics, setUserTopics] = useState(
    profile?.learningGoals ? profile.learningGoals : []
  );

  const onFinish = async (e) => {
    e.preventDefault();
    setFormSubmit(true);
    console.log("userTopicsuserTopics", userTopics);
    let reponse = await dispatch(
      updateInterestedTopics({ topics: userTopics })
    );
    console.log("reponse", reponse);
    if (reponse && reponse.type === "PROFILE_SUCCESS") {
      setFormSubmit(false);
      setOpen(false);
    } else {
      setFormSubmit(false);
    }
  };

  return (
    <>
      <div className="border border-gray-200 rounded-xl my-4 relative">
        <h3 className="text-xl mx-6 mt-6 mb-6 font-semibold">
          Interested Topics
        </h3>
        <button
          className="border bg-white border-gray-200 px-2 py-2 rounded-full absolute right-4 top-6 w-22 flex gap-2 justify-center items-center transform transition duration-300 hover:scale-110"
          onClick={() => setOpen(true)}>
          <p className="text-base ml-2">Edit</p>
          <EditPencilTwo color="black" />
        </button>
        <div className="flex flex-row mx-6 mb-4 gap-4 flex-wrap">
          {profile.learningGoals
            ? profile.learningGoals.map((topic, index) => (
                <button
                  key={index}
                  className="border border-gray-200 px-4 py-1 rounded-3xl hover:bg-gray-300 text-lg transform transition duration-300 hover:scale-110">
                  {topic}
                </button>
              ))
            : null}
        </div>
      </div>

      <Drawer open={open} onClose={setOpen} title="Interested Topics">
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
      </Drawer>
    </>
  );
}

export default Topics;
