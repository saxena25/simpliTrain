import React from "react";

const Icon = (props) => {
  return (
    <svg {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.7" x="1" y="1" width="18" height="18" rx="3" stroke="white" strokeWidth="2"/>
      <path d="M6 9.5L8.5 12L14.5 7" stroke={props.color?props.color:'white'} strokeWidth="2"/>
    </svg>
  );
};

export default Icon;
