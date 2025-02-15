import React from "react";
import { Button } from "../../../components/ui-components";
import { Input } from "antd";
import { useState } from "react";
import { checkIsMobile } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { LogoutUser, SetverifyPassword } from "../../../redux/authentication/actionCreator";
import { deleteAccount } from "../../../redux/settings/actionCreator";
import ConfirmedDelete from "./ConfirmedDelete";

function DeletePassword() {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const isMobile = checkIsMobile();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let formData = {
      password: password
    }
    let response = await dispatch(SetverifyPassword(formData));
    if(response && response.type === "AUTH_SUCCESS"){
      let deleteAc = await dispatch(deleteAccount())
      if(deleteAc && deleteAc.type === "SETTINGS_SUCCESS"){
        let reponse = await dispatch(LogoutUser());
        setDeleteSuccess(true); 
        console.log("account Deleted");
      }
    }
    console.log("from delete handleSubmit: ",password);
  };

  return (
    <div className="md:max-w-[65%] h-full m-auto flex flex-col gap-4 justify-center">
      {deleteSuccess ? (
        <ConfirmedDelete  />
      ) : (
        <>
          <h1 className="text-3xl font-medium text-secondary">
            Enter Your Password
          </h1>
          <p className="text-xs md:text-base text-primary">
            To proceed with deactivating your account, please enter your
            password below. This step is necessary to verify your identity and
            ensure the security of your account
          </p>
          <form onSubmit={handleSubmit}>
            <Input.Password
              onChange={handleChange}
              placeholder="Set Password"
              className="border-none bg-input-background rounded-xl px-4 py-4 text-primary"
            />

            <Button
              type="submit"
              color="primary"
              variant="solid"
              className="w-full m-auto my-20 rounded-xl"
                // onClick={() => setDeleteSuccess(true)}
            >
              Continue
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

export default DeletePassword;
