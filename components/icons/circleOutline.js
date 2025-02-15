import React from "react";

const Icon = (props) => {
  return (
    <svg width={props.size?props.size:'16'} height={props.size?props.size:'16'} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle r="45" cx="50" cy="50" stroke="#00000060" strokeWidth="5" fill="none" />
    </svg> 
  );
};

export default Icon;
