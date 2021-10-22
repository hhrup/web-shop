import React, { Component } from 'react';
import { HomePageContainer } from './homepage.styles';
import configData from '../../appConfig';


const Homepage = ({currentUser}) => (
  <HomePageContainer>
    <h1>Hello!</h1>
    <h2>{currentUser.email}</h2>
    {
      currentUser.uid === configData.adminFirebaseUserId ?
      <h3>ADMIN CONTROLS </h3> : ''
    }
  </HomePageContainer>
);

export default Homepage;
