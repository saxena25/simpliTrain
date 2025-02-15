import React, { useEffect, useState } from "react";
import {
  Button,
  otpField,
  PincodeField,
  Spinner,
} from "../../../components/ui-components";
import { useDispatch } from "react-redux";
import {
  resentOtp,
  verifyEmail,
  verifyOTP,
} from "../../../redux/authentication/actionCreator";
import { sendEmailOtp, verifyEmailPassword } from "../../../redux/settings/actionCreator";

function OtpVerification({ email, setNewPassword }) {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState(email);
  const [resend, setResend] = useState(false);
  const [counter, setCounter] = useState(30);
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [formSubmit, setFormSubmit] = useState(false);
  const [formData, setFormData] = useState({
    otp: "",
  });
  // console.log("email: ", userEmail)

  const handleChange = (value) => {
    console.log(value);
    setFormData({ ...formData, otp: value });
  };

  const validate = () => {
    const newErrors = {};
    console.log(formData.otp);

    const otpFormat = /^[0-9]{6}$/;
    if (!formData.otp) {
      newErrors.otp = "Please enter the verification code.";
    } else if (formData.otp.length < 6 || formData.otp.length > 6) {
      newErrors.otp = "The code must be 6 digits.";
    } else if (!otpFormat.test(formData.otp)) {
      newErrors.otp = "Please enter only numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const newErrors = {};
      console.log(formData);
      let response = await dispatch(verifyEmailPassword(formData));
      console.log("verify Email Otp: ", response);
      if (response && response.type === "SETTINGS_SUCCESS") {
        setNewPassword(true);
      } else {
        newErrors.otp =
          "The code you entered is incorrect. Please try again.";
      }
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setResend(true);
    }

    return () => clearTimeout(timer);
  }, [counter]);

  const sendOtp = async () => {
    let response = await dispatch(sendEmailOtp());
    if (response && response.type === "AUTH_SUCCESS") {
      setCounter(30);
    }
  };

  useEffect(() => {
    sendOtp();
  }, []);



  return (
    <div className="md:max-w-[66%] m-auto flex flex-col gap-4 md:my-16">
      <h1 className="text-3xl font-medium text-secondary">OTP Verification</h1>
      <p className="text-base text-primary">
        We've sent a six-digit code for verification to your following email ID.
        Kindly enter the code below to change the password.
      </p>
      <p className="text-base text-secondary font-medium">{email}</p>


      <form onSubmit={handleSubmit} method="POST" className="w-full">
        <PincodeField
          label=""
          type={"tel"}
          name={"otp"}
          id={"otp"}
          placeholder="otp"
          onChange={handleChange}
          error={errors.otp}
        />
        <div className="flex flex-row items-center justify-between w-full py-4 m-0 mb-3">
          <button
            onClick={sendOtp}
            disabled={!resend}
            type={"button"}
            color="text"
            className={"font-medium p-0 border-0 underline"}>
            {"Resend"}
          </button>
          <span>{counter}</span>
        </div>
        <Button
          type="submit"
          color="primary"
          variant="solid"
          // onClick={() => setFormSubmit(true)}
          className={formSubmit ? "w-20" : "w-full"}
          rounded={formSubmit ? true : false}>
          {formSubmit ? <Spinner className={""} color={"white"} /> : "Confirm"}
        </Button>
      </form>
    </div>
  );
}

export default OtpVerification;
