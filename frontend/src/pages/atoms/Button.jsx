import React from "react";

export default function Button(props) {
  const { type, text, onClick, dataButton } = props;
  return (
    <>
      {onClick ? (
        <button type={type} onClick={onClick}>
          {text}
        </button>
      ) : (
        <button type={type}>{text}</button>
      )}
    </>
  );
}
