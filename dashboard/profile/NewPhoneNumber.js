import { Button } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../components/ui-components";
import { useDispatch } from "react-redux";
import { newUserMobileOtp } from "../../../redux/profile/actionCreator";

const NewPhoneNumber = ({ onOtpVerified, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    countryCode: "91",
    mobile: "",
  })
  const [formSubmit, setFormSubmit] = useState(false);

  const handleChange = (e) => {
    // const value = e.target.value;
    e.target.autofocus = true;
    // console.log(value);
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };

  const onFinish = async(e) => {
    e.preventDefault();
    
    let response = await dispatch(newUserMobileOtp(formData));
    if(response && response.type === "PROFILE_SUCCESS"){
      onOtpVerified(formData.mobile);
    }else{
      console.log("Failed Sending New Mobile")
    }
  };


  return (
    <div className="max-w-md w-full m-auto px-6 flex flex-col justify-center items-center gap-5 h-[65vh]">
      <div className="h-fit flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-secondary font-semibold">
            Change Mobile Number
          </h1>
          <p className="text-xs text-primary w-full max-w-sm">
            Please enter your new mobile number. Ensure the number is correct to
            receive important updates and notifications
          </p>
        </div>
        <form
          onSubmit={onFinish}
          method="POST"
          className="w-full flex flex-col gap-4">
          <div className="bg-input-background w-full mx-auto rounded-xl">
            <label
              htmlFor="phone-number"
              className="block text-xs text-[#262626] px-3 pt-2">
              Phone number
            </label>
            <div className="">
              <div className="flex rounded-md bg-input-background">
                <div className="grid shrink-0 grid-cols-1 gap-1 focus-within:relative border-r border-r-gray-200 my-1 ">
                  <select
                    id="countryCode"
                    name="countryCode"
                    autoComplete="countryCode"
                    aria-label="CountryCode"
                    onChange={handleChange}
                    value={formData.countryCode}
                    className="col-start-1 border-none bg-input-background rounded-bl-xl row-start-1 w-full appearance-none rounded-md py-1.5 pl-3 pr-7 text-base text-black font-medium  sm:text-sm/6 focus:ring-0">
                    <option value="91">(+91)</option>
                    <option value="01">(+01)</option>
                    <option value="10">(+10)</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-[10px] self-center justify-self-end text-black font-medium size-4"
                  />
                </div>
                <input
                  value={formData.mobile}
                  onChange={handleChange}
                  id="mobile"
                  name="mobile"
                  type="number"
                  placeholder="123-456-7890"
                  className="block bg-input-background rounded-br-xl border-none min-w-0 grow py-1.5 pl-4 pr-3 font-medium text-base text-black placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            color="primary"
            variant="solid"
            className={`${
              formSubmit ? "w-20" : "w-full"
            } py-2 bg-[#333333] rounded-lg text-white`}
            rounded={formSubmit ? true : false}>
            {formSubmit ? (
              <Spinner className={""} color={"white"} />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPhoneNumber;
