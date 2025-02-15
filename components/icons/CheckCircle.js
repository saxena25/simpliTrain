import React from "react";

const Icon = (props) => {
  return (
    <svg width={props.size?props.size:'153'} height={props.size?props.size:'153'} viewBox="0 0 153 153" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle opacity="0.1" cx="76.5" cy="76.5" r="76.5" fill={props.color?props.color:"#262626"}  />
      <path d="M30 75 L55 105 L120 50" stroke="black" strokeWidth="10"></path>
      {/* <path d="M65 78.5L73.4457 86.9969L94 69.7578" stroke="black" strokeWidth="3.97826"/> */}
    </svg>
  );
};

export default Icon;
