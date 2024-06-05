import React from "react";

import ButtonDiv from "../../styles/button.styles";

export default function Button(props) {
  const { type, text, title, className, onClick, name, icon } = props;
  return (
    <ButtonDiv>
      {onClick ? (
        <button
          className={className}
          title={title}
          type={type}
          onClick={onClick}
          name={name}
        >
          <span className={icon?.props?.className}>{icon}</span>
          <span>{text}</span>
        </button>
      ) : (
        <button className={className} title={title} type={type} name={name}>
          <span className={icon?.props?.className}>{icon}</span>
          <span>{text}</span>
        </button>
      )}
    </ButtonDiv>
  );
}
