import React from "react";
import { useState } from "react";
import { Input } from "antd";
import { Button } from "../../../components/ui-components";
import Success from "./Success";
import { checkIsMobile } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { updateUserPassword, verifyEmailPassword } from "../../../redux/settings/actionCreator";

function SetPassword() {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const isMobile = checkIsMobile();
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSymbol: false,
    notName: false,
    notEmail: false,
  });
  const dispatch = useDispatch();

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);
    const notName = !name || !password.includes(name);
    const notEmail = !email || !password.includes(email);

    setRequirements({
      minLength: minLength,
      hasNumber: hasNumber,
      hasSymbol: hasSymbol,
      notName: notName,
      notEmail: notEmail,
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(password);
    let formState = {
      password: password
    }
    let response = await dispatch(updateUserPassword(formState));
    if(response && response.type === "SETTINGS_SUCCESS"){
      setSuccess(true);
    }
  };

  return (
    <div className="md:max-w-[66%] h-full m-auto flex flex-col gap-4">
      {success ? (
        <Success />
      ) : (
        <div className="w-full h-full m-auto flex flex-col gap-4 justify-center">
          <h1 className="text-3xl font-medium text-secondary">
            Set new password
          </h1>
          <p className="text-base text-primary">
            Your OTP has been verified. Now, please set new password.
          </p>
          <form onSubmit={handleSubmit}>
            <Input.Password
              onChange={handleChange}
              placeholder="Set Password"
              className="border-none bg-input-background rounded-xl px-4 py-4 text-primary"
            />

            <ul className="list-disc list-inside text-sm my-4">
              <li
                className={
                  requirements.minLength
                    ? "text-green-500 text-sm"
                    : "text-red-500 text-sm"
                }>
                Password strength: weak
              </li>
              <li
                className={
                  requirements.hasNumber
                    ? "text-green-500 text-sm"
                    : "text-red-500 text-sm"
                }>
                Contains a Number
              </li>
              <li
                className={
                  requirements.hasSymbol
                    ? "text-green-500 text-sm"
                    : "text-red-500 text-sm"
                }>
                Contains a Symbol (e.g., !@#$%^&)
              </li>
              <li
                className={
                  requirements.notName
                    ? "text-green-500 text-sm"
                    : "text-red-500 text-sm"
                }>
                Can't contain your name
              </li>
              <li
                className={
                  requirements.notEmail
                    ? "text-green-500 text-sm"
                    : "text-red-500 text-sm"
                }>
                Can't contain your email address
              </li>
            </ul>

            <Button
              type="submit"
              color="primary"
              variant="solid"
              className="w-full m-auto my-10 rounded-xl"
              >
              Save & Continue
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SetPassword;
