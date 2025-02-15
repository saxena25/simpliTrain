import React, { useEffect } from "react";
import { EditPencilTwo } from "../../../components/icons";
import { useState } from "react";
import { Button, Drawer, Spinner } from "../../../components/ui-components";
import { updateBio } from "../../../redux/profile/actionCreator";
import { useDispatch } from "react-redux";

function Bio({profile}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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
    // console.log(formState);
    setFormSubmit(true);
    let reponse = await dispatch(updateBio(formState));
    // console.log('reponse', reponse);
    if(reponse && reponse.type === "PROFILE_SUCCESS"){
      setFormSubmit(false);
      setOpen(false);
    }else{
      setFormSubmit(false);
    }
  };

  useEffect(()=>{
    // profile?.onboarding
    if(profile.onboarding && profile.onboarding.length>0){
      setBio(profile.onboarding[0].bio);
    }
  },[profile]);

  // updateBio
  return (
    <>
      <div className="border border-gray-200 rounded-xl my-4 relative">
        <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">Bio</h3>
        <button
          className="border bg-white border-gray-200 px-2 py-2 rounded-full absolute right-4 top-5 w-22 flex gap-2 justify-center items-center transform transition duration-300 hover:scale-110"
          onClick={() => setOpen(true)}>
          <p className="text-base ml-2">Edit</p>
          <EditPencilTwo color="black" />
        </button>
        <p className="px-4 mb-6 text-lg text-gray-600">
          { bio }
        </p>
      </div>

      <Drawer open={open} onClose={setOpen} title="Edit Bio">
        <form
          onSubmit={onFinish}
          method="POST"
          className="flex flex-col justify-between h-full">
          <textarea
            name="bio"
            onChange={handleChange}
            value={formState.bio}
            className="text-lg rounded-md bg-gray-100 border-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-44 overflow-y-auto"></textarea>
            <Button type='submit' color='primary' variant='solid' className={`my-4 m-auto text-2xl ${formSubmit?'w-20':'w-52'}`} rounded={formSubmit?true:false}>{formSubmit?<Spinner className={''} color={'white'} />:'SAVE'}</Button>
        </form>
      </Drawer>
    </>
  );
}

export default Bio;
