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

const Header = ({currentUser}) => {
  async function logOut() {
    await signOut(auth);
  }

  return (
    <HeaderContainer>
      <HomeLogoContainer to='/'>
        <HomeLogo />
      </HomeLogoContainer>
      <CartAndSignInContainer>
        <CartLogoContainer to=''>
          <CartItemCount>10</CartItemCount>
          <CartLogo />
        </CartLogoContainer>
        {currentUser ?
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

// <button onClick={this.logOut}>SIGN OUT</button>
// <button onClick={this.getCurrentUser}>getCurrentUser</button>

export default Header;
