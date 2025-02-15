import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import GoogleButton from "../../components/shared-components/GoogleButton";
import AppleButton from "../../components/shared-components/AppleButton";
import AuthFooter from "../../components/shared-components/AuthFooter";
import { Button, Divider } from "../../components/ui-components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { checkIsMobile } from "../../utils/helpers";
import google from "../../assets/svgs/google.svg";
import userCircle from "../../assets/svgs/userCircle.svg";
import phone from "../../assets/svgs/phone.svg";

export async function authLoader() {
  // await sleep();
  return {
    date: new Date().toISOString(),
  };
}

const Auth = () => {
  const navigate = useNavigate();
  let data = useLoaderData();
  const isMobile = checkIsMobile();

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <img
        className="w-[160px] text-center"
        src={require("../../assets/images/logo.png")}
        alt="Simplitrain logo"
      />
      <h3 className="text-2xl text-text font-medium">
        {"Shape Your Tomorrow with Simplitrain"}
      </h3>
      
      {/*
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-sm text-gray-500 font-medium">Previous Login</h3>
        <div className="flex flex-col gap-4">
          
          <div className="p-3 rounded-2xl bg-gray-50">
            <div className="flex flex-row w-full gap-2">
              <img className="w-9" src={userCircle} alt="profile" />
              <div className="w-full flex flex-row justify-between ">
                <div className="flex flex-col items-start">
                  <h3 className="text-base text-secondary font-semibold">
                    Continue as Google
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    rohanjoshan04@gmail.com
                  </p>
                </div>
                <img
                  className="w-11 bg-gray-200 rounded-full py-2 px-3"
                  src={google}
                  alt="google"
                />
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded-2xl bg-gray-50">
            <div className="flex flex-row w-full gap-2">
              <img className="w-9" src={userCircle} alt="profile" />
              <div className="w-full flex flex-row justify-between ">
                <div className="flex flex-col items-start">
                  <h3 className="text-base text-secondary font-semibold">
                    Continue as Phone Number
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    +91 9999999999
                  </p>
                </div>
                <img
                  className="w-11 bg-gray-200 rounded-full py-2 px-3"
                  src={phone}
                  alt="google"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      */}

      <div className="flex flex-row items-center justify-between w-full gap-2">
        <GoogleButton />
        <AppleButton />
      </div>
      <Divider>or</Divider>

      {/* background-color: var('--primary-color');
        color: var('--white-color');
        width: 100%;
        padding: 20px;
        font-family: var('--button-text');
        font-size: 14px;
        font-weight: 700;
        line-height: 21px;
        text-align: center; */}
      {/* {
          isMobile ? ()
        } */}

      <Button
        // href="/auth/signin"
        onClick={() => navigate("/auth/signin")}
        type="link"
        color="primary"
        variant="solid"
        className={"w-full"}
        rounded={false}>
        Continue with Email / Phone
      </Button>
    </div>
  );
};

export default Auth;
