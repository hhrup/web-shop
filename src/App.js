import React, { Component } from 'react';
import Header from './components/header/header.component';
import GlobalStyle from './globalStyles';
import { Route, Switch } from 'react-router';
import Homepage from './pages/homepage/homepage.component';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase.auth';
import CreateProduct from './components/create-product/create-product.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ''
    }
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({currentUser: user});
      } else {
        this.setState({currentUser: ''});
      }
    });
  }

  render() {
    return(
      <div>
        <GlobalStyle />
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' >
            <Homepage currentUser={this.state.currentUser}/>
          </Route>
          <Route exact path='/createProduct'>
            <CreateProduct />
          </Route>
          <Route exact path='/signup'>
            <SignUp currentUser={this.state.currentUser}/>
          </Route>
          <Route exact path='/login'>
            <SignIn currentUser={this.state.currentUser}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
