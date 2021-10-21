import styled from 'styled-components';
import { ReactComponent as GoogleIcon } from '../../assets/Google_2015_logo.svg';

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4.8rem;
`;

export const SignInWithGoogle = styled(GoogleIcon)`
  width: 12rem;
  height: 4rem;
  cursor: pointer;
  border: 1px solid;
  padding: 0.6rem;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.05, 1.05)
  }
`;

export const Separator = styled.div`
  border-top: 1px solid;
`;
