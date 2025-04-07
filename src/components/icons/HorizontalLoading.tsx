import DotsHorizontal from "./DotsHorizontal";
import { keyframes, styled } from "styled-components";

const animationCircle = keyframes`
  0% {
    transform: scale(1);
  }
  85% {
    transform: scale(0);
  }
  100% {
    transform: scale(0);
  }
`;

const HorizontalLoading = styled(DotsHorizontal)`
  circle {
    animation-name: ${animationCircle};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
    -webkit-animation-duration: 1s;
    -webkit-animation-name: ${animationCircle};
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -webkit-animation-direction: alternate;
    -moz-animation-duration: 1s;
    -moz-animation-name: ${animationCircle};
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;
    -moz-animation-direction: alternate;
  }
  g:nth-child(1) circle {
    animation-delay: 0s;
    -webkit-animation-delay: 0s;
    -moz-animation-delay: 0s;
  }
  g:nth-child(2) circle {
    animation-delay: 0.3s;
    -webkit-animation-delay: 0.3s;
    -moz-animation-delay: 0.3s;
  }
  g:nth-child(3) circle {
    animation-delay: 0.6s;
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
  }
`;

export default HorizontalLoading;
