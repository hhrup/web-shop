import React, { Component } from 'react';
import { getDocuments } from './firebase/firebase.utils';
import Header from './components/header/header.component';
import GlobalStyle from './globalStyles';
import { Route, Switch } from 'react-router';
import Homepage from './pages/homepage/homepage.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase.auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ''
    }
  }

  componentDidMount() {
    const docs = getDocuments();
    docs.then(data => console.log(data));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({currentUser: user});
      } else {
        this.setState({currentUser: ''});
      }
    })
  }

  render() {
    return(
      <div className='App'>
        <GlobalStyle />
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' >
            <Homepage currentUser={this.state.currentUser}/>
          </Route>
          <Route exact path='/signup'>
            <SignInSignUp currentUser={this.state.currentUser}/>
          </Route>
        </Switch>
        {
        //<button onClick={addDocument}>Add city</button>
        //<button onClick={deleteDocument}>Delete city</button>
        //<input type='file'/>
        }
      </div>
    );
  }
}

export default App;
