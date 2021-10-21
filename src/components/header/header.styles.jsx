import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Icon } from '../../assets/motherboard-svgrepo-com.svg';

export const HeaderContainer = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 1rem;
  border-bottom: 1px solid;
`;

export const LogoContainer = styled(Link)`
  height: 5rem;
  width: 5rem;
`;

export const Logo = styled(Icon)`
  width: 100%;
`;

export const SignUpSignIn = styled(Link)`
  text-decoration: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: inherit;

  &:hover {
    color: red;
  }
`;
