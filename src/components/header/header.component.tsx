import React from 'react';
import {
  HeaderContainer,
  HomeLogoContainer,
  HomeLogo,
  SignUpSignIn,
  SignUpSignInContainer,
  LinkSeparator,
  CartLogoContainer,
  CartLogo,
  CartAndSignInContainer,
  CartItemCount
} from './header.styles';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.auth';
import { useAppSelector } from '../../redux/hooks';

export default function Header() {
  const currentUser = useAppSelector(state => state.user);
  async function logOut() {
    await signOut(auth);
  }

  const numberOfCartItems = useAppSelector(state => state.cart.numberOfCartItems);

  return (
    <HeaderContainer>
      <HomeLogoContainer to='/'>
        <HomeLogo />
      </HomeLogoContainer>
      <CartAndSignInContainer>
        <CartLogoContainer to='/checkout'>
          <CartItemCount>{numberOfCartItems}</CartItemCount>
          <CartLogo />
        </CartLogoContainer>
        {currentUser.id ?
          (
            <SignUpSignIn to='#' onClick={logOut}>
                Welcome {currentUser.email.split('@')[0].toUpperCase()}. Log out
            </SignUpSignIn>
          )
          :
          (
            <SignUpSignInContainer>
              <SignUpSignIn to='/login'>Log in</SignUpSignIn> 
              <LinkSeparator>|</LinkSeparator>
              <SignUpSignIn to='/signup'>Sign up</SignUpSignIn>
            </SignUpSignInContainer> 
          )
        }
      </CartAndSignInContainer>
    </HeaderContainer>
  );
}
