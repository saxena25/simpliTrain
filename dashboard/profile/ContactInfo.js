import React, { useEffect, useState } from "react";
import { Drawer } from "../../../components/ui-components";
import PhoneVerification from "./PhoneVerification";
import NewPhoneNumber from "./NewPhoneNumber";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { notification } from "antd";

function ContactInfo({ profile }) {
  // const [contactInformation, setContactInformation] = useState([]);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("verifyOldPhone");
  const [showAlert, setShowAlert] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [updateMobile, setUpdateMobile] = useState(false);
  const [isMobileExist, setIsMobileExist] = useState(profile?.mobile ? true : false);
  const [mobile, setMobile] = useState('')
  // console.log("dASFasf", isMobileExist)
  const openNotification = (placement) => {
    api.info({
      // message: `Notification ${placement}`,
      description: "Mobile Number has been updated",
      placement,
    });
  };

  // console.log("profile", profile);

  const handleVerified = () => {
    setOpen(false);
    setStep("success");
    setTimeout(() => {
      setStep("verifyOldPhone");
    }, 3000);
  };

  useEffect(() => {
    if (step === "success") {
      // setShowAlert(true);
      openNotification("bottom");
    }
  }, [step]);

  return (
    <>
      {contextHolder}
      <div className="border border-gray-200 rounded-xl pb-2 mt-4">
        <h3 className="text-xl mx-6 mt-6 mb-6 font-semibold">
          Contact Information
        </h3>
        <div className="flex flex-row border-b border-gray-200 px-6 py-3 last:border-0">
          <div className="w-1/3 flex items-center">
            <p className="text-gray-600 text-xs">{"EMAIL"}</p>
          </div>
          <p className="font-semibold text-sm">{profile?.email}</p>
        </div>
        <div className="relative flex flex-row border-b border-gray-200 px-6 py-3 last:border-0">
          <div className="w-1/3 flex items-center">
            <p className="text-gray-600 text-xs">{"PHONE NUMBER"}</p>
          </div>
          <p className="font-semibold text-sm">+{`${
            profile?.countryCode ? profile.countryCode : ""
          } ${profile?.mobile ? profile.mobile : ""}`}</p>
          <button
            className="absolute right-5 top-4 cursor-pointer text-sm font-semibold text-text"
            onClick={() => {
              setOpen(true);
              profile?.mobile ? setStep("verifyOldPhone") : setStep("enterNewPhone");
            }}>
            {profile?.mobile ? "Change" : "Update"}
          </button>
        </div>
      </div>
      <Drawer open={open} onClose={setOpen}>
        {step === "verifyOldPhone" && (
          <PhoneVerification
            onVerified={() => setStep("enterNewPhone")}
            onClose={() => setOpen(false)}
            isMobileExist={isMobileExist}
          />
        )}
        {step === "enterNewPhone" && (
          <NewPhoneNumber
            // onOtpVerified={() => {
            //   setStep("verifyNewPhone");
            // }}
            onOtpVerified={(mobile)=>{
              setMobile(mobile);
              setStep("verifyNewPhone");
            }}
            mobile={profile?.mobile}
            onClose={() => setOpen(false)}
          />
        )}
        {step === "verifyNewPhone" && (
          <PhoneVerification
            onVerified={() => {
              handleVerified();
            }}
            onClose={() => setOpen(false)}
            mobile={profile?.mobile}
            isMobileExist={isMobileExist}
          />
        )}
        {/* {showAlert === "success" &&
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="shrink-0">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="size-5 text-green-400"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Mobile Number has been updated
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">
                      <span className="sr-only">Dismiss</span>
                      <XMarkIcon aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          } */}
      </Drawer>
    </>
  );
}

export default ContactInfo;
