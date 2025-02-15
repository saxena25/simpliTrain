import React, { useState } from "react";
import { AppleIcon } from "../icons";
import { Button } from "../ui-components";

const AppleButton= () => {
  const [focus, setFocus] = useState(false);
  // const { action, loading } = props;

  const appleLoginAction = () => {
    console.log('Apple Login');
  }

  return (
    <Button onClick={appleLoginAction} className="apple-button" type='button' icon={<AppleIcon />}>Apple</Button>
  );
};

export default AppleButton;
