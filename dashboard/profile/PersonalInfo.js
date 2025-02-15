import React, { useEffect, useState } from "react";
import { EditPencilTwo } from "../../../components/icons";
import { DropDownField, Drawer } from "../../../components/ui-components";
import DiscriptionRow from "./DiscriptionRow";
import PersonalInfoCommon from "./PersonalInfoCommon";


const PersonalInfo = ({ profile, countries = [] }) => {
  const [personalInformation, setPersonalInformation] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (profile?.onboarding?.length > 0) {
      const address = `${profile?.onboarding[0]?.addressLine1 || ""} ${
        profile?.onboarding[0]?.addressLine2 || ""
      } ${profile?.onboarding[0]?.city} ${profile?.onboarding[0]?.state} ${
        profile?.onboarding[0]?.country
      }`.trim();

      setPersonalInformation([
        {
          label: "Full NAME",
          value: profile?.name,
        },
        {
          label: "AGE",
          value: profile?.age_limit,
        },
        {
          label: "GENDER",
          value: profile?.gender,
        },
        {
          label: "ADDRESS",
          value: address,
        },
      ]);

      // console.log("on Component Mount: ", address);
    }
  }, [profile]);

  return (
    <>
      <div className="border border-gray-200 rounded-xl relative pb-2 mb-4">
        <button
          className="border bg-white border-gray-200 px-2 py-2 rounded-full absolute right-4 top-6 w-22 flex gap-2 justify-center items-center transform transition duration-300 hover:scale-110"
          onClick={() => setOpen(true)}>
          <p className=" text-base ml-2">Edit</p>
          <EditPencilTwo color="black" />
        </button>

        <h3 className="text-xl mx-6 mt-6 mb-6 font-semibold">
          Personal Information
        </h3>
        {personalInformation.map((item, index) => (
          <DiscriptionRow label={item.label} key={index} value={item.value} />
        ))}
      </div>

      <Drawer open={open} onClose={setOpen} title="Edit Personal Information">
        <PersonalInfoCommon profile={profile} countries={countries} setOpen={setOpen} />
      </Drawer>
    </>
  );
};

export default PersonalInfo;
