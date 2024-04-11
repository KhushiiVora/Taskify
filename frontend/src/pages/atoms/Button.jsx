import React from "react";

export default function Button(props) {
  const { type, text, onClick, name, icon } = props;
  return (
    <>
      {onClick ? (
        <button type={type} onClick={onClick} name={name} >
          {icon} {` `} {text}
        </button>
      ) : (
        <button type={type} name={name} >
          {icon} {` `}
          {text}
        </button>
      )}
    </>
  );
}
