import React from "react";
import SignUp from "../../components/sign-up/sign-up.component";
import SignIn from "../../components/sign-in/sign-in.component";
import { SignUpInContainer } from "./sign-in-sign-up.styles";

const SignInSignUp = ({currentUser}) => (
  <div>
    <SignUpInContainer>
      <SignIn currentUser={currentUser}/>
      <SignUp currentUser={currentUser}/>
    </SignUpInContainer>
  </div>
);

export default SignInSignUp;