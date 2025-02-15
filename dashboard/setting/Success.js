import React, { useEffect } from "react";
import { Button } from "../../../components/ui-components";
import { checkIsMobile } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";

function Success() {
  const isMobile = checkIsMobile();
  const navigate = useNavigate(); 
  useEffect(() => {
    const timer = setTimeout(()=>{
      navigate('/dashboard');
    },2000)

    return ()=> clearTimeout(timer);
  },[])
  return (
    <div className="md:max-w-[80%] text-center md:text-start h-full m-auto flex flex-col gap-2 justify-center items-center">
      <div className="w-32 h-32 bg-input-background rounded-full"></div>
      <h1 className="text-3xl md:text-2xl font-medium text-secondary">Password{isMobile && <br />} Reset Successful</h1>
      <p className="text-xs md:text-base text-primary">Your password has been successfully updated!</p>
      <p className="text-xs md:text-base text-primary">You can now log in to your account using your new password</p>
      <Button
        type="submit"
        color="primary"
        variant="solid"
        className="w-fit md:w-full m-auto my-4 rounded-xl px-8 py-3 h-fit md:px-0 md:py-0"
          onClick={()=>navigate('/dashboard')}
      >
        Done
      </Button>
    </div>
  );
}

export default Success;
