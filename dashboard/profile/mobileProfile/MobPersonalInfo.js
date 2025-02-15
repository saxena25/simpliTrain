import React, { useEffect } from "react";
import { useState } from "react";
import { EditPencilTwo } from "../../../../components/icons";
import MobDrawer from "../../../../components/ui-components/MobDrawer";
import { Button, DropDownField } from "../../../../components/ui-components";
import MobFloatingTextField from "../../../../components/ui-components/MobFloatingTextField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PersonalInfoCommon from "../PersonalInfoCommon";

function MobPersonalInfo({ profile, countries = [] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [personalInformation, setPersonalInformation] = useState([]);

  useEffect(() => {
      if (profile?.onboarding?.length > 0) {
        const address = `${profile?.onboarding[0]?.addressLine1 || ""} ${
          profile?.onboarding[0]?.addressLine2 || ""
        } ${profile?.onboarding[0]?.city} ${profile?.onboarding[0]?.state} ${
          profile?.onboarding[0]?.country
        }`.trim();
  
        setPersonalInformation({
          name: profile?.name,
          age_limit: profile?.age_limit,
          gender: profile?.gender,
          address: address
        }
          
        );
  
        // console.log("on Component Mount: ", address);
      }
    }, [profile]);

  return (
    <>
      <div className="border bg-white border-gray-200 rounded-2xl relative pb-4">
        <button
          className="border  border-gray-300 px-1 py-1 rounded-full absolute right-4 top-6 w-22 flex gap-2 justify-center items-center"
          onClick={() => setOpen(true)}>
          <p className=" text-base ml-2">Edit</p>
          <EditPencilTwo color="black" className="" />
        </button>

        <h3 className="text-lg mx-6 mt-6 mb-8 font-semibold">
          Personal Information
        </h3>
        <div className="flex flex-col gap-1  px-6 pb-3">
          <div className="w-1/3 flex items-center">
            <p className="text-gray-600 text-xs">FIRST NAME</p>
          </div>
          <p className="font-semibold text-sm">{personalInformation.name}</p>
        </div>

        <div className="flex flex-col gap-1   px-6 py-3">
          <div className="w-1/3">
            <p className="text-gray-600 text-xs">AGE</p>
          </div>
          <p className="font-semibold text-sm">{personalInformation.age_limit}</p>
        </div>

        <div className="flex flex-col gap-1  px-6 py-3">
          <div className="w-1/3">
            <p className="text-gray-600 text-xs">GENDER</p>
          </div>
          <p className="font-semibold text-sm">{personalInformation.gender}</p>
        </div>

        <div className="flex flex-col gap-1 border-gray-200 px-6 py-3">
          <div className="w-1/3">
            <p className="text-gray-600 text-xs">ADDRESS</p>
          </div>
          <p className="font-semibold text-sm">
            {personalInformation.address}
          </p>
        </div>
      </div>

      <MobDrawer
        open={open}
        onClose={setOpen}
        title="Edit Personal Information">
        <PersonalInfoCommon profile={profile} countries={countries} setOpen={setOpen} />
      </MobDrawer>
    </>
  );
}

export default MobPersonalInfo;
