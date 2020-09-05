import { keyframes } from "styled-components";

export const easing = {
  rubber: "cubic-bezier(0.175, 0.885, 0.335, 1.05)",
};

export const glow = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
`;
export const modalCloseAnimate = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;
export const modalOpenAnimate = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const progressFlash = keyframes`
  0% { opacity: 0.1;
    width: 0; 
  }
  20% { opacity: 0.5;
    width: 0; 
  } 
  100% { opacity: 0;
    width: 100%; 
  }
`;

export const messageOpenAnimate = keyframes`
  0% {
    opacity: 0;
    margin-top: -30px;
  }
  50% {
    opacity: 0.1;
    margin-top: -15px;
  }
  100% {
    opacity: 1;
    margin-top: 0;
  }
`;

export const messageCloseAnimate = keyframes`
  0% {
    opacity: 1;
    margin-top: 0;
  }
  100% {
    opacity: 0;
    margin-top: -30px;
  }
`;
export const iconSpin = keyframes`
  0% {
     transform: rotate(0deg);
  }
  100% {
     transform: rotate(360deg);
  }
`;