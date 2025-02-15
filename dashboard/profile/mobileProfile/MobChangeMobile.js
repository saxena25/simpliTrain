import React, { useState } from "react";
import MobFloatingTextField from "../../../../components/ui-components/MobFloatingTextField";
import { Button, Spinner } from "../../../../components/ui-components";
import MobDrawer from "../../../../components/ui-components/MobDrawer";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export async function MobChangeMobileLoader() {
  // await sleep();
  return {
    date: new Date().toISOString(),
  };
}

function MobChangeMobile() {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState("number");
  const [formSubmit, setFormSubmit] = useState(false);
  const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    const value = e.target.value;
    e.target.autofocus = true;
    console.log(value);
  };

  const onFinish = (e) => {
    navigate("/dashboard/MobNewVerification");
  };

  return (
    <MobDrawer
      open={true}
      onClose={() => navigate("/dashboard/mobProfile")}
      title="">
      <div className="px-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-secondary font-semibold">
            Change Mobile Number
          </h1>
          <p className="text-xs text-primary w-full max-w-sm">
            Please enter your new mobile number. Ensure the number is correct to
            receive important updates and notifications
          </p>
        </div>
        <form onSubmit={onFinish} method="POST" className="w-full h-[70vh] flex flex-col justify-between">
          {/* <FloatingLabel variant="filled" className='h-16 mb-1 pl-4 pr-4 w-full bg-input-background border-0 text-input-text placeholder-transparent rounded-xl' label="Email ID / Phone Number" /> */}
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
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 border-none bg-input-background rounded-bl-xl row-start-1 w-full appearance-none rounded-md py-1.5 pl-3 pr-7 text-base text-black font-medium  sm:text-sm/6 focus:ring-0">
                    <option>(+91)</option>
                    <option>(+01)</option>
                    <option>(+10)</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-[10px] self-center justify-self-end text-black font-medium size-5"
                  />
                </div>
                <input
                  value="9898992231"
                  id="phone-number"
                  name="phone-number"
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
            className={formSubmit ? "w-20" : "w-full"}
            rounded={formSubmit ? true : false}>
            {formSubmit ? (
              <Spinner className={""} color={"white"} />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </div>
    </MobDrawer>
  );
}

export default MobChangeMobile;
