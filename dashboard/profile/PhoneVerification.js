import { Button } from "@headlessui/react";
import { PincodeField, Spinner } from "../../../components/ui-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOtpMobile,
  verifyNumber,
} from "../../../redux/profile/actionCreator";

const PhoneVerification = ({ onVerified, onClose, mobile, isMobileExist }) => {
  const { myProfile } = useSelector((state) => {
    return {
      myProfile: state.myProfile.data,
    };
  });
  // console.log("asdfsd", myProfile?.mobile)
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [formData, setFormData] = useState({
    otp: "",
  });
  const [resend, setResend] = useState(false);
  const [counter, setCounter] = useState(30);
  const dispatch = useDispatch();
  // console.log(mobile)
  // console.log("asdfasdf", isMobileExist)

  const validate = () => {
    const newErrors = {};
    // Pincode validation
    // console.log(formData.otp);
    const phoneFormat = /^[0-9]{6}$/;
    if (!formData.otp) {
      newErrors.otp = "Please enter the verification code.";
    } else if (formData.otp.length < 6 || formData.otp.length > 6) {
      newErrors.otp = "The code must be 6 digits.";
    } else if (!phoneFormat.test(formData.otp)) {
      newErrors.otp = "Please enter only numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setFormSubmit(true);

    if (validate()) {
      let response = await dispatch(verifyNumber(formData));
      if (response && response.type === "PROFILE_SUCCESS") {
        onVerified();
      } else {
        // console.log("Failed Sending New Mobile");
      }
    } else {
      // console.log("Otp not valid");
    }
  };

  useEffect(() => {
    if (isMobileExist) {
      dispatch(sendOtpMobile());
    }
  }, []);

  const handleChange = (value) => {
    // console.log(value);
    setFormData({ ...formData, otp: value });
  };

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000); // Countdown every second
    } else {
      setResend(true);
      // setCounter(30);
    }
    return () => clearTimeout(timer); // Cleanup the timer
  }, [counter]);
  return (
    <div className="h-[65vh] max-w-md w-full m-auto flex flex-col justify-center items-center gap-5">
      <div>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl text-text text-left w-full font-medium">
            OTP Verification
          </h3>
          <p className="text-base text-text text-left w-full">
            We've sent a six-digit code for verification to your following
            Mobile number. Kindly enter the code below to change your mobile
            number.
          </p>
          <div className="flex flex-row gap-2">
            <p className="text-base text-secondary font-semibold">
              +91 {myProfile?.mobile}
            </p>
            <button>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V9.75"
                  stroke="#292D32"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0284 2.26592L6.11844 8.17592C5.89344 8.40092 5.66844 8.84342 5.62344 9.16592L5.30094 11.4234C5.18094 12.2409 5.75844 12.8109 6.57594 12.6984L8.83344 12.3759C9.14844 12.3309 9.59094 12.1059 9.82344 11.8809L15.7334 5.97092C16.7534 4.95092 17.2334 3.76592 15.7334 2.26592C14.2334 0.765922 13.0484 1.24592 12.0284 2.26592Z"
                  stroke="#292D32"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.1836 3.10938C11.6861 4.90187 13.0886 6.30437 14.8886 6.81437"
                  stroke="#292D32"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <form
          onSubmit={onFinish}
          method="POST"
          className="h-full w-full flex flex-col ">
          <div className="py-4">
            <PincodeField
              label="otp"
              type={"tel"}
              name={"otp"}
              id={"otp"}
              placeholder="otp"
              onChange={handleChange}
              error={errors.otp}
            />
            <div className="flex flex-row items-center justify-between w-full py-4 m-0 mb-3">
              <button
                type="button"
                disabled={!resend}
                onClick={() => {
                  dispatch(sendOtpMobile());
                  setCounter(30);
                }}
                // href="/auth/forgot"
                color="text"
                className={`{font-medium p-0 underline  ${resend ? "font-medium text-black hover:cursor-pointer" : "font-thin text-gray-200 hover:cursor-not-allowed"}}`}>
                {"Resend Code"}
              </button>
              <span>{counter === 0 ? "" : counter}</span>
            </div>
          </div>

          <Button
            type="submit"
            color="primary"
            variant="solid"
            className={`${
              formSubmit ? "w-20 py-2" : "w-full py-2 "
            } mx-auto bg-[#333333] text-white rounded-lg`}
            rounded={formSubmit ? true : false}>
            {formSubmit ? (
              <Spinner className={"m-auto"} color={"white"} />
            ) : (
              "Confirm"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PhoneVerification;
