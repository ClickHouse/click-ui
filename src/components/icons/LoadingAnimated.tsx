import styled, { keyframes } from "styled-components";
import Loading from "./Loading";

const spin = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const LoadingAnimated = styled(Loading)`
  animation: ${spin} 1s infinite linear;
`;

export default LoadingAnimated;
