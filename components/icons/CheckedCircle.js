import React from "react";

const Icon = (props) => {
  return (
    <svg width={props.size?props.size:'16'} height={props.size?props.size:'16'} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="white"/>
      <path d="M4 8.05102L7.03896 10.5L12.5714 4.5" stroke="black" strokeWidth="2"/>
    </svg>

  );
};

export default Icon;
