import React from "react";

export default function Input(props) {
  const { name, type, value, onChange, required, autoFocus } = props;
  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
      />
    </>
  );
}
