import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/svg/motherboard-svgrepo-com.svg';
import { ReactComponent as CartIcon} from '../../assets/svg/cartIcon.svg';
import Cart from '../../assets/svg/cartIcon.svg';

export const HeaderContainer = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.4rem 0 2.4rem;
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
  background-color: #f3f0ff;
  background-color: #6741d9;
`;

export const HomeLogoContainer = styled(Link)`
  height: 5rem;
  width: 5rem;
`;

export const HomeLogo = styled(HomeIcon)`
  width: 100%;
  fill: #fff;

  &:hover {
    fill: #f3f0ff;
  }
`;

export const CartAndSignInContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

export const CartLogoContainer = styled(Link)`
  height: 3.5rem;
  width: 3.5rem;
  position: relative;
`;

export const CartItemCount = styled.div`
  position: absolute;
  top: 15%;
  left: 30%;
  font-size: 1.4rem;
  font-weight: 500;
  color: #40c057;
`;

export const CartLogo = styled(CartIcon)`
  width: 100%;
  fill: #fff;

  &:hover {
    fill: #f3f0ff;
  }
`;

export const SignUpSignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignUpSignIn = styled(Link)`
  text-decoration: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: inherit;

  &:hover {
    color: #f3f0ff;
  }
`;

export const LinkSeparator = styled.div`
  font-size: 2.4rem;
  padding: 0 1.6rem 0 1.6rem;
`;
