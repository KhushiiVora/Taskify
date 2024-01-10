import React from "react";

export default function Input(props) {
  const { name, type, value, onChange, required } = props;
  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
}
