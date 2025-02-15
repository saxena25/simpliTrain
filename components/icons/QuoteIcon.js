import React from "react";
import { checkIsMobile } from "../../utils/helpers";

const Icon = (props) => {
  const isMobile = checkIsMobile();
  return (
    <svg width={isMobile ? "45": "64"} height="47" viewBox="0 0 64 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 33C28 40.6 22.8 46.2 14.8 46.2C6.8 46.2 0.400001 39.6 0.400001 28.8C0.400001 14.2 10.6 2.59999 24.6 0.59999V8.99999C16.8 10.6 11.2 15.8 11.2 22.2C12.6 21.4 14.4 20.8 16.8 20.8C23 20.8 28 25.2 28 33ZM63.8 33C63.8 40.6 58.4 46.2 50.6 46.2C42.4 46.2 36 39.6 36 28.8C36 14.2 46.4 2.59999 60.4 0.59999V8.99999C52.6 10.6 47 15.8 47 22C48.4 21.2 50.2 20.8 52.4 20.8C58.6 20.8 63.8 25.2 63.8 33Z" fill="black"/>
    </svg>

  );
};

export default Icon;






