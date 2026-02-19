import { keyframes, styled } from 'styled-components';
import Loading from './Loading';

const spin = keyframes`
  from {
    transform: rotate(0deg) scaleX(-1);
  }
  to {
    transform: rotate(360deg) scaleX(-1);
  }
`;

const Loading_Animated = styled(Loading)`
  animation: ${spin} 1s infinite linear;
`;

export default Loading_Animated;
