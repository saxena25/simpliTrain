import React, { useEffect, useState } from "react";
import {
  getAllStates,
  updateProfile,
} from "../../../redux/profile/actionCreator";
import { useDispatch } from "react-redux";
import {
  Button,
  DropDownField,
  FloatingTextField,
  Spinner,
} from "../../../components/ui-components";
import { checkIsMobile } from "../../../utils/helpers";
import MobFloatingTextField from "../../../components/ui-components/MobFloatingTextField";

function PersonalInfoCommon({ profile, countries = [], setOpen }) {
  const dispatch = useDispatch();
  const isMobile = checkIsMobile();
  const [personalInformation, setPersonalInformation] = useState([]);
  const [states, setStates] = useState([]);
  const [formSubmit, setFormSubmit] = useState(false);
  const [AllCountries, setAllCountries] = useState(countries);
  const [formState, setFormState] = useState({
    name: profile?.name,
    email: profile?.email,
    gender: profile?.gender,
    age: profile?.age_limit,
    addressLine1: profile?.onboarding?.[0]?.addressLine1 || "",
    addressLine2: profile?.onboarding?.[0]?.addressLine2 || "",
    city: profile?.onboarding?.[0]?.city || "",
    state: profile?.onboarding?.[0]?.state || "",
    country: profile?.onboarding?.[0]?.country || "",
    zipcode: profile?.onboarding?.[0]?.zipcode || "",
  });
  // console.log("all Countries: ", AllCountries);
  // console.log('countries', profile, countries);

  const handleCountryChange = async (e) => {
    const selectedCountryName = e.target.value;

    const selectedCountry = AllCountries.find(
      (item) => item.country_name === selectedCountryName
    );

    if (selectedCountry) {
      const selectedCountryId = selectedCountry.id;
      // console.log("selectedCountry id: ", selectedCountryId);

      setFormState({
        ...formState,
        country: selectedCountryName,
        state: "",
      });

      const formData = {
        id: selectedCountryId,
      };
      const response = await dispatch(getAllStates(formData));
      if (response.type === "PROFILE_SUCCESS") {
        // console.log("Fetched States", response);
        setStates(response.data);
      }
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = async (e) => {
    e.preventDefault();

    setFormSubmit(true);
    const updatedData = {
      name: formState.name,
      email: formState.email,
      gender: formState.gender,
      age_limit: formState.age,
      onboarding: {
        addressLine1: formState.addressLine1,
        addressLine2: formState.addressLine2,
        city: formState.city,
        state: formState.state,
        country: formState.country,
        zipcode: formState.zipcode,
      },
    };
    // console.log("updated Data: ", updatedData);
    let response = await dispatch(updateProfile(updatedData));
    // console.log("profile function response: ", response);
    if (response && response.type === "PROFILE_SUCCESS") {
      setFormSubmit(false);
      setOpen(false);
    } else {
      setFormSubmit(false);
    }
  };

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
    <form
      onSubmit={onFinish}
      method="POST"
      className="flex flex-col justify-center md:w-96 px-5 md:px-0 m-auto">
      {isMobile ? (
        <>
          <MobFloatingTextField
            label="FULL NAME"
            type="text"
            onChange={handleChange}
            value={formState.name}
            name={"name"}
            id={"name"}
            placeholder="Enter Full Name"
            // className="w-full"
          />
          <DropDownField
            options={[
              { key: "Male", value: "Male" },
              { key: "Female", value: "Female" },
              { key: "Other", value: "Other" },
            ]}
            label="Gender"
            name={"gender"}
            id={"gender"}
            placeholder="Select Gender"
            error={""}
            value={formState.gender}
            onChange={handleChange}
          />
          <MobFloatingTextField
            label="Age"
            type="text"
            value={formState.age}
            onChange={handleChange}
            name={"age"}
            id={"age"}
            placeholder="Age"
          />
          <MobFloatingTextField
            label="addressLine1"
            type="text"
            value={formState.addressLine1}
            onChange={handleChange}
            name={"addressLine1"}
            id={"addressLine1"}
            placeholder="Address Line 1"
          />
          <MobFloatingTextField
            label="addressLine2"
            type="text"
            value={formState.addressLine2}
            onChange={handleChange}
            name={"addressLine2"}
            id={"addressLine2"}
            placeholder="Address Line 2"
          />

          <div className={"flex flex-col gap-3"}>
            <select
              name="country"
              id="country"
              onChange={handleCountryChange}
              value={formState.country}
              className="h-16 border-none bg-input-background rounded-lg text-gray-500">
              {AllCountries.map((item) => (
                <option
                  key={item.id}
                  value={item.country_name}
                  style={{ height: "2rem" }}>
                  {item.country_name}
                </option>
              ))}
            </select>
            <MobFloatingTextField
              label="City"
              type="text"
              value={formState.city}
              onChange={handleChange}
              name={"city"}
              id={"city"}
              placeholder="City"
            />
            <select
              name="state"
              id="state"
              onChange={handleChange}
              value={formState.state}
              className="h-16 border-none bg-input-background rounded-lg text-gray-500">
              {Object.keys(states).map((item) => (
                <option key={states[item].id} value={states[item].state_name}>
                  {states[item].state_name}
                </option>
              ))}
            </select>
            <MobFloatingTextField
              label="zipcode"
              type="number"
              value={formState.zipcode}
              onChange={handleChange}
              name={"zipcode"}
              id={"zipcode"}
              placeholder="Zipcode"
            />
          </div>
        </>
      ) : (
        <>
          <FloatingTextField
            label="Full NAME"
            type="text"
            onChange={handleChange}
            value={formState.name}
            name={"name"}
            id={"name"}
            placeholder="Enter Full Name"
            // className="w-full"
          />
          <DropDownField
            options={[
              { key: "Male", value: "Male" },
              { key: "Female", value: "Female" },
              { key: "Other", value: "Other" },
            ]}
            label="Gender"
            name={"gender"}
            id={"gender"}
            placeholder="Select Gender"
            error={""}
            value={formState.gender}
            onChange={handleChange}
          />
          <FloatingTextField
            label="Age"
            type="text"
            value={formState.age}
            onChange={handleChange}
            name={"age"}
            id={"age"}
            placeholder="Age"
          />
          <FloatingTextField
            label="addressLine1"
            type="text"
            value={formState.addressLine1}
            onChange={handleChange}
            name={"addressLine1"}
            id={"addressLine1"}
            placeholder="Address Line 1"
          />
          <FloatingTextField
            label="addressLine2"
            type="text"
            value={formState.addressLine2}
            onChange={handleChange}
            name={"addressLine2"}
            id={"addressLine2"}
            placeholder="Address Line 2"
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              name="country"
              id="country"
              onChange={handleCountryChange}
              value={formState.country}
              className="h-16 border-none bg-input-background rounded-lg text-gray-500">
              {AllCountries.map((item) => (
                <option
                  key={item.id}
                  value={item.country_name}
                  style={{ height: "2rem" }}>
                  {item.country_name}
                </option>
              ))}
            </select>
            <FloatingTextField
              label="City"
              type="text"
              value={formState.city}
              onChange={handleChange}
              name={"city"}
              id={"city"}
              placeholder="City"
            />
            <select
              name="state"
              id="state"
              onChange={handleChange}
              value={formState.state}
              className="h-16 border-none bg-input-background rounded-lg text-gray-500">
              {Object.keys(states).map((item) => (
                <option key={states[item].id} value={states[item].state_name}>
                  {states[item].state_name}
                </option>
              ))}
            </select>
            <FloatingTextField
              label="zipcode"
              type="number"
              value={formState.zipcode}
              onChange={handleChange}
              name={"zipcode"}
              id={"zipcode"}
              placeholder="Zipcode"
            />
          </div>
        </>
      )}

      <Button
        type="submit"
        color="primary"
        variant="solid"
        className={`m-auto my-6 ${formSubmit ? "w-20" : "w-52"}`}
        rounded={formSubmit ? true : false}>
        {formSubmit ? <Spinner className={""} color={"white"} /> : "SAVE"}
      </Button>
    </form>
  );
}

export default PersonalInfoCommon;
