import React from "react";

export default function Button(props) {
  const { type, text, onClick, name } = props;
  return (
    <>
      {onClick ? (
        <button type={type} onClick={onClick} name={name}>
          {text}
        </button>
      ) : (
        <button type={type} name={name}>
          {text}
        </button>
      )}
    </>
  );
}
