import React, { Component } from 'react';
import {
  HeaderContainer,
  LogoContainer,
  Logo,
  SignUpSignIn,
} from './header.styles';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase.auth';

const Header = ({currentUser}) => {
  async function logOut() {
    const something = await signOut(auth);
    console.log('headerComponent sign out', something);
  }

  function getCurrentUser() {
    console.log('Current user', auth.currentUser);
  }

  return (
      <HeaderContainer>
        <LogoContainer to='/'>
          <Logo />
        </LogoContainer>
        {
          currentUser ?
          (<SignUpSignIn to='#' onClick={logOut}>
          WELCOME {currentUser.email.split('@')[0].toUpperCase()}. SIGN OUT
          </SignUpSignIn>)
          :
          (<SignUpSignIn to='/signup'>SIGN IN</SignUpSignIn>)
        }
        <button onClick={getCurrentUser}>getCurrentUser</button>
      </HeaderContainer>
    );
  }

// <button onClick={this.logOut}>SIGN OUT</button>
// <button onClick={this.getCurrentUser}>getCurrentUser</button>

export default Header;
