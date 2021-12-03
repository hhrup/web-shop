import styled, { keyframes } from 'styled-components';

const SpinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 10rem;
  height: 10rem;
  border: 1.6rem solid #d0bfff;
  border-top: 1.6rem solid #7048e8;
  border-radius: 50%;
  animation: ${SpinAnimation} 2s linear infinite;
`;

export const SpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;