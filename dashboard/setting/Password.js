import React, { useState } from "react";
import rightArrow from "../../../assets/svgs/rightArrow.svg";
import { Drawer } from "../../../components/ui-components";
import OtpVerification from "./OtpVerification";
import SetPassword from "./SetPassword";
import { checkIsMobile } from "../../../utils/helpers";
import MobDrawer from "../../../components/ui-components/MobDrawer";
import { useDispatch } from "react-redux";
import { sendEmailOtp } from "../../../redux/settings/actionCreator";

function Password({myProfile}) {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const email = myProfile?.email;
  // console.log("check 1: ", email);
  const isMobile = checkIsMobile();
  const dispatch = useDispatch();

  // const sendOtp = async () => {
  //   let response = await dispatch(sendEmailOtp());
  //   if (response && response.type === "AUTH_SUCCESS") {
  //     console.log("OTP sent");
  //   }
  // };

  return (
    <>
      <div
        className="w-full flex flex-row justify-between items-start transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mt-4 md:mt-8 border-b pb-4 md:border-none md:pb-0"
        onClick={() => setOpen(true)}>
        <div className="w-full flex flex-row justify-between gap-2">
          <p className="text-base text-primary">Change Password</p>
          <img src={rightArrow} alt="" />
        </div>
      </div>

      {isMobile ? (
        <MobDrawer open={open} onClose={setOpen}>
          {newPassword ? (
            <SetPassword />
          ) : (
            <OtpVerification setNewPassword={setNewPassword} />
          )}
        </MobDrawer>
      ) : (
        <Drawer open={open} onClose={setOpen}>
          {newPassword ? (
            <SetPassword />
          ) : (
            <OtpVerification email={email} setNewPassword={setNewPassword} />
          )}
        </Drawer>
      )}
    </>
  );
}

export default Password;
