import { SVGAttributes } from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const LoadingIcon = styled.svg`
  animation: ${spin} 1s infinite linear;
`;

const Loading = (props: SVGAttributes<SVGElement>) => (
  <LoadingIcon
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M7.625 8.875H4.5V5.75"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.5 12A7.495 7.495 0 0 0 5.188 8.875"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M16.375 15.125H19.5v3.125"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.5 12a7.495 7.495 0 0 0 14.312 3.125"
    />
  </LoadingIcon>
);

export default Loading;
