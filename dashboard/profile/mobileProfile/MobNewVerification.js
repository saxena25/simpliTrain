import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobDrawer from "../../../../components/ui-components/MobDrawer";
import { Button, PincodeField, Spinner } from "../../../../components/ui-components";

export async function MobNewVerificationLoader() {
    // await sleep();
    return {
      date: new Date().toISOString(),
    };
  }

function MobNewVerification() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [formData, setFormData] = useState({
    pincode: "",
  });

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
          navigate("/dashboard/mobProfile");
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
      

      <MobDrawer open={true} onClose={setOpen} title="">
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

export default MobNewVerification;
