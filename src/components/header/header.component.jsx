import React, { Component } from 'react';
import {
  HeaderContainer,
  LogoContainer,
  Logo,
  SignUpSignIn,
} from './header.styles';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase.auth';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
    }
  }

  async logOut() {
    const something = await signOut(auth);
    console.log('headerComponent sign out', something);
  }

  getCurrentUser() {
    console.log('Current user', auth.currentUser);
  }

  componentDidMount() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.setState({currentUser: user});
        } else {
          this.setState({currentUser: undefined});
        }
      })
  }

  render() {
    return (
      <HeaderContainer>
        <LogoContainer to='/'>
          <Logo />
        </LogoContainer>
        {
          this.state.currentUser ?
          (<SignUpSignIn to='#' onClick={this.logOut}>
          WELCOME {this.state.currentUser.email.split('@')[0].toUpperCase()}. SIGN OUT?
          </SignUpSignIn>)
          :
          (<SignUpSignIn to='/signup'>SIGN IN</SignUpSignIn>)
        }
      </HeaderContainer>
    );
  }
}

// <button onClick={this.logOut}>SIGN OUT</button>
// <button onClick={this.getCurrentUser}>getCurrentUser</button>

export default Header;
