import React from "react";

const Icon = ({ className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10.9075C4 10.3308 4.24896 9.78216 4.68299 9.40238L10.683 4.15238C11.437 3.49259 12.563 3.49259 13.317 4.15238L19.317 9.40238C19.751 9.78216 20 10.3308 20 10.9075V18C20 19.1046 19.1046 20 18 20H16C14.8954 20 14 19.1046 14 18V16C14 14.8954 13.1046 14 12 14V14C10.8954 14 10 14.8954 10 16V18C10 19.1046 9.10457 20 8 20H6C4.89543 20 4 19.1046 4 18V10.9075Z" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>

  );
};

export default Icon;
