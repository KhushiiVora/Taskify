import React from "react";

export default function Button(props) {
  const { type, text } = props;
  return (
    <>
      <button type={type}>{text}</button>
    </>
  );
}
