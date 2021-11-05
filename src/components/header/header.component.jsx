import React from 'react';
import {
  HeaderContainer,
  LogoContainer,
  Logo,
  SignUpSignIn,
  CreateProductLink
} from './header.styles';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.auth';
import configData from '../../helperScripts/appConfig';

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
        (<SignUpSignIn to='/signup'>SIGN IN</SignUpSignIn>)
      }
    </HeaderContainer>
  );
}

// <button onClick={this.logOut}>SIGN OUT</button>
// <button onClick={this.getCurrentUser}>getCurrentUser</button>

export default Header;
