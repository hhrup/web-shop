import React, { Component } from 'react';
import { auth } from '../../firebase/firebase.auth';
import { HomePageContainer } from './homepage.styles';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
    }
  }

  componentDidMount() {
    
  }

  render() {
    return(
      <HomePageContainer>

      </HomePageContainer>
    )
  }

}

export default Homepage;
