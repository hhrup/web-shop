import React, { Component } from 'react';
import { getDocuments } from './firebase/firebase.utils';
import Header from './components/header/header.component';
import GlobalStyle from './globalStyles';
import { Route, Switch } from 'react-router';
import Homepage from './pages/homepage/homepage.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    const docs = getDocuments();
    docs.then(data => console.log(data));
  }

  render() {
    return(
      <div className='App'>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/signup' component={SignInSignUp}/>
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
