import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
// import { Button, Divider, Form, FormProps, Input, Select, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
import {
  checkUser,
  checkUserType,
} from "../../redux/authentication/actionCreator";
import GoogleButton from "../../components/shared-components/GoogleButton";
import AppleButton from "../../components/shared-components/AppleButton";
import AuthFooter from "../../components/shared-components/AuthFooter";
import { BackArrow } from "../../components/icons";
import {
  Button,
  Divider,
  TextField,
  FloatingTextField,
  Spinner,
} from "../../components/ui-components";

export async function signinLoader() {
  return {
    date: new Date().toISOString(),
  };
}

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useSelector((state)=>state.auth.role);
  // const { register, handleSubmit, formState: { errors } } = useForm();
  const [inputType, setInputType] = useState("text"); // Initial type is email
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    role: [userRole],
  });
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  let data = useLoaderData();

  // console.log("signIn role: ", userRole)

  const validate = () => {
    const newErrors = {};
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneFormat = /^[0-9]{10}$/;
    // Email validation
    if (!formData.username) {
      newErrors.username = "Please enter your email or phone number.";
    } else {
      if (inputType == "text") {
        if (!emailFormat.test(formData.username)) {
          newErrors.username = "Please enter a valid email address.";
        }
      } else {
        if (!phoneFormat.test(formData.username)) {
          newErrors.username = "Please enter a valid phone number.";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFinish = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setFormSubmit(true);
    // console.log('formData', formData);
    if (validate()) {
      formData["type"] = inputType == "text" ? "email" : "mobile";
      let reponse = await dispatch(checkUser(formData));
      console.log("reponse", reponse);
      if (reponse && reponse.type === "AUTH_SUCCESS") {
        if (reponse.data.newUser) {
          navigate("/auth/verification", {
            state: {
              username: formData.username,
              type: formData.type,
              new_user: true,
            },
          });
        } else {
          navigate("/auth/password", {
            state: {
              username: formData.username,
              type: formData.type,
              new_user: false,
            },
          });
        }
      } else if (reponse && reponse.type === "AUTH_ERR") {
        newErrors.username = reponse.err;
      } else {
        newErrors.username = "Something wenet wrong!!!";
      }
      setErrors(newErrors);
      setFormSubmit(false);
    }
  };

  const handleChange = (e) => {
    // console.log('e.target', );
    const value = e.target.value;
    setInputValue(value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log('value', value);
    // If the input matches a number pattern, switch to 'number'
    if (/^\d*$/.test(value) && value.length > 4) {
      setInputType("tel");
    } else {
      setInputType("text");
    }
    e.target.autofocus = true;
  };

  const loadPhoneCode = (status) => {
    if (status == "tel") {
      return (
        <select
          id="countries"
          className="h-[52px] w-20 mt-[1rem] p-3 bg-input-background text-base text-input-text placeholder-transparent border-0 appearance-none  focus:outline-none focus:ring-0 focus:border-0">
          <option value={91}>+91</option>
          {/* <option>Canada</option>
        <option>France</option>
        <option>Germany</option> */}
        </select>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <h3 className="text-2xl text-text text-center w-full font-medium">
        {"Sign In / Sign Up"}
      </h3>
      <form onSubmit={onFinish} method="POST" className="w-full">
        {/* <FloatingLabel variant="filled" className='h-16 mb-1 pl-4 pr-4 w-full bg-input-background border-0 text-input-text placeholder-transparent rounded-xl' label="Email ID / Phone Number" /> */}
        <FloatingTextField
          prifix={loadPhoneCode(inputType)}
          label="Email ID / Phone Number"
          type={inputType}
          onChange={handleChange}
          name={"username"}
          id={"username"}
          placeholder="demo@gmail.com"
          error={errors.username}
        />
        <Button
          type="submit"
          color="primary"
          variant="solid"
          className={formSubmit ? "w-20" : "w-full"}
          rounded={formSubmit ? true : false}>
          {formSubmit ? <Spinner className={""} color={"white"} /> : "Continue"}
        </Button>
      </form>
      <Divider>or</Divider>
      <div className="flex flex-row items-center justify-between w-full gap-2">
        <GoogleButton />
        <AppleButton />
      </div>
    </div>
  );
};

export default Signin;
