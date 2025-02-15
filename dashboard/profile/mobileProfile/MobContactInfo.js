import React from "react";
import { useState } from "react";
import { EditPencil, EditPencilTwo } from "../../../../components/icons";
import MobDrawer from "../../../../components/ui-components/MobDrawer";
import {
  Button,
  PincodeField,
  Spinner,
} from "../../../../components/ui-components";
import { useLocation, useNavigate } from "react-router-dom";
import { notification } from "antd";

function MobContactInfo({ profile }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState("verifyOldPhone");
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [formData, setFormData] = useState({
    pincode: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [updateMobile, setUpdateMobile] = useState(false);
  const openNotification = (placement) => {
    api.info({
      // message: `Notification ${placement}`,
      description: "Mobile Number has been updated",
      placement,
    });
  };

  const validate = () => {
    const newErrors = {};
    // Pincode validation
    console.log(formData.pincode);
    const phoneFormat = /^[0-9]{6}$/;
    if (!formData.pincode) {
      newErrors.pincode = "Please enter the verification code.";
    } else if (formData.pincode.length < 6 || formData.pincode.length > 6) {
      newErrors.pincode = "The code must be 6 digits.";
    } else if (!phoneFormat.test(formData.pincode)) {
      newErrors.pincode = "Please enter only numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setFormSubmit(true);

    setTimeout(() => {
      if (validate()) {
        const newErrors = {};
        // alert('Form submitted successfully!');
        console.log(formData);
        if (formData.pincode === "123456") {
          //
          navigate("/dashboard/mobVerification");
        } else {
          newErrors.pincode =
            "The code you entered is incorrect. Please try again.";
          setErrors(newErrors);
        }

        setFormSubmit(false);
      } else {
        setFormSubmit(false);
      }
    }, 2000);
  };

  const handleChange = (value) => {
    console.log(value);
    setFormData({ ...formData, pincode: value });
  };
  return (
    <>
    {contextHolder}
      <div className="border border-gray-200 rounded-xl bg-white pb-4">
        <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">
          Contact Information
        </h3>

        <div className="flex flex-col gap-1  px-6 pb-3">
          <p className="text-gray-600 text-xs">EMAIL</p>

          <p className="font-semibold overflow-hidden text-sm">
            {profile?.email || ""}
          </p>
        </div>
        <div className="flex flex-col gap-1 px-6 py-3">
          <p className="text-gray-500 text-xs">PHONE NUMBER</p>

          <div className="flex flex-row justify-between w-full items-center">
            <p className="font-semibold text-sm">{profile?.mobile || ""}</p>
            <button
              onClick={() => {
                setOpen(true);
                profile?.mobile
                  ? setStep("verifyOldPhone")
                  : setStep("enterNewPhone");
              }}
              className="text-xs underline text-[#121417] font-medium">
              CHANGE
            </button>
          </div>
        </div>
      </div>

      <MobDrawer open={open} onClose={setOpen} title="">
        <div className="h-[80vh] flex flex-col justify-start items-start gap-5">
          <div className="flex flex-col gap-1 pt-8">
            <h3 className="text-2xl text-text text-left w-full font-medium">
              OTP Verification
            </h3>
            <p className="text-base text-text text-left w-full">
              We've sent a six-digit code for verification to your following
              Mobile number. Kindly enter the code below to change your mobile
              number.
            </p>
            <p className="text-base text-secondary font-medium">
              +91 9999999999
            </p>
          </div>

          <form
            onSubmit={onFinish}
            method="POST"
            className="h-full w-full flex flex-col justify-between">
            {/* <FloatingTextField label="Password" type={'password'} name={"password"} id={"password"} placeholder="Password" error={errors.password} /> */}

            <div>
              <PincodeField
                label=""
                type={"tel"}
                name={"pincode"}
                id={"pincode"}
                placeholder="Pincode"
                onChange={handleChange}
                error={errors.pincode}
              />
              <div className="flex flex-row items-center justify-between w-full py-4 m-0 mb-3">
                <a
                  href="/auth/forgot"
                  color="text"
                  className={"font-medium p-0 underline"}>
                  {"Resend"}
                </a>
                <span>0:00</span>
              </div>
            </div>

            <Button
              type="submit"
              color="primary"
              variant="solid"
              className={`${formSubmit ? "w-20" : "w-full"} mx-auto`}
              rounded={formSubmit ? true : false}>
              {formSubmit ? (
                <Spinner className={"m-auto"} color={"white"} />
              ) : (
                "Confirm"
              )}
            </Button>
          </form>
        </div>
      </MobDrawer>
    </>
  );
}

export default MobContactInfo;
