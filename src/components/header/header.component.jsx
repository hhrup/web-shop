import React from 'react';
import {
  HeaderContainer,
  LogoContainer,
  Logo,
  SignUpSignIn,
  SignUpSignInContainer,
  LinkSeparator,
} from './header.styles';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.auth';

const Header = ({currentUser}) => {
  async function logOut() {
    await signOut(auth);
  }

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo />
      </LogoContainer>
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
    </HeaderContainer>
  );
}

// <button onClick={this.logOut}>SIGN OUT</button>
// <button onClick={this.getCurrentUser}>getCurrentUser</button>

export default Header;
