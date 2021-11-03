import React from "react";
import { StyledButton } from "./styles";

const Button = ({ handleMouseUp, title }) => {
  return (
    <StyledButton
      drag
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={1}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
      onMouseUp={handleMouseUp}
    >
      {title}
    </StyledButton>
  );
};
export default Button;
