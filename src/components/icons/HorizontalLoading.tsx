import DotsHorizontal from "./DotsHorizontal";
import styled, { keyframes } from "styled-components";

const animationCircle1 = keyframes`
  0 {
    r: 0;
  }
  30% {
    r: 1.5;
  }
  60% {
    r: 0;
  }
  100% {
    r: 0;
  }
`;
const animationCircle2 = keyframes`
  0 {
    r: 0;
  }
  20% {
    r: 0;
  }
  40% {
    r: 1.5;
  }
  80% {
    r: 0;
  }
  100% {
   r: 0
  }
`;
const animationCircle3 = keyframes`
  0 {
    r: 0;
  }
  40% {
    r: 0;
  }
  80% {
    r: 1.5;
  }
  100% {
   r: 0
  }
`;

const HorizontalLoading = styled(DotsHorizontal)`
  circle {
    animation-name: horizontal-loading;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    -webkit-animation-name: horizontal-loading;
    -webkit-animation-duration: 1.5s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    &:nth-child(1) {
      animation-name: ${animationCircle1};
      -webkit-animation-name: ${animationCircle1};
    }
    &:nth-child(2) {
      animation-name: ${animationCircle2};
      -webkit-animation-name: ${animationCircle2};
    }
    &:nth-child(3) {
      animation-name: ${animationCircle3};
      -webkit-animation-name: ${animationCircle3};
    }
  }
`;

export default HorizontalLoading;
