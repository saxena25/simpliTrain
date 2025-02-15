import React, { useEffect } from "react";
import { checkIsMobile } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../../redux/authentication/actionCreator";

function ConfirmedDelete() {
  const isMobile = checkIsMobile();
  const navigate = useNavigate();
  const dispatch = useNavigate();
    const logoutUser = async () => {
      navigate("/")
    };

    useEffect(() => {
      setTimeout(()=>{
        logoutUser();
      },1000)
    }, []);
  
  //   const timer = setTimeout(async () => {
  //     try {
  //       let response = await dispatch(LogoutUser());
  //       navigate(0);
  //       navigate("/");

  //       // if(response && response.type === "AUTH_SUCCESS"){
  //       //   console.log("redirecting to Home");
  //       //   navigate('/');

  //       //   setTimeout(()=>{
  //       //     navigate(0);
  //       //   },100)
  //       // }else{
  //       //   console.log("logout failed or invalid response");
  //       // }
  //     } catch (error) {
  //       console.log("error during logout:", error);
  //     }
  //   }, 2000);
  // }, []);
  return (
    <div className="md:max-w-[70%] m-auto flex flex-col gap-3 justify-center items-center text-center">
      <div className="bg-input-background rounded-full w-16 h-16 md:w-32 md:h-32"></div>
      <h1 className="text-3xl md:text-2xl font-medium text-secondary">
        Your Account{isMobile && <br />} has been deleted
      </h1>
      <p className="text-xs md:text-base text-primary">
        Your account has been deactivated successfully, you can reactivate it
        within 30 days. After that, your account will be permanently deleted.
      </p>
    </div>
  );
}

export default ConfirmedDelete;
