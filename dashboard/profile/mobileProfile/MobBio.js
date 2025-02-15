import React, { useEffect } from "react";
import { useState } from "react";
import { EditPencilTwo } from "../../../../components/icons";
import MobDrawer from "../../../../components/ui-components/MobDrawer";
import { Button, Spinner } from "../../../../components/ui-components";
import { useDispatch } from "react-redux";
import { updateBio } from "../../../../redux/profile/actionCreator";

function MobBio({ profile }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [formSubmit, setFormSubmit] = useState(false);
  const [bio, setBio] = useState(null);
  const [formState, setFormState] = useState({
    bio: null,
  });

  const handleChange = (e) => {
    // let {name,value} = e.target;
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = async (e) => {
    e.preventDefault();
    console.log(formState);
    setFormSubmit(true);
    let reponse = await dispatch(updateBio(formState));
    console.log("reponse", reponse);
    if (reponse && reponse.type === "PROFILE_SUCCESS") {
      setFormSubmit(false);
      setOpen(false);
    } else {
      setFormSubmit(false);
    }
  };

  useEffect(() => {
    // profile?.onboarding
    if (profile.onboarding && profile.onboarding.length > 0) {
      setBio(profile.onboarding[0].bio);
    }
  }, [profile]);
  return (
    <>
      <div className="bg-white rounded-xl relative">
        <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">Bio</h3>
        <button
          className="border  border-gray-300 px-1 py-1 rounded-full absolute right-4 top-6 w-22 flex gap-2 justify-center items-center"
          onClick={() => setOpen(true)}>
          <p className="text-base ml-2">Edit</p>
          <EditPencilTwo color="black" />
        </button>
        <p className="px-6 mb-6 text-base text-gray-600">{bio}</p>
      </div>

      <MobDrawer open={open} onClose={setOpen} title="Edit Bio">
        <form
          onSubmit={onFinish}
          className="flex flex-col justify-between h-full px-5">
          <textarea
            name="bio"
            onChange={handleChange}
            value={formState.bio}
            className="text-lg rounded-md bg-gray-100 border-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-44 overflow-y-auto"
            placeholder="Bio"></textarea>
          <Button
            type="submit"
            color="primary"
            variant="solid"
            className={`w-full my-4 m-auto text-2xl ${
              formSubmit ? "w-20" : "w-full"
            }`}
            rounded={formSubmit ? true : false}>
            {formSubmit ? <Spinner className={""} color={"white"} /> : "SAVE"}
          </Button>
        </form>
      </MobDrawer>
    </>
  );
}

export default MobBio;
