import React, {Component} from "react";
import SignUp from "../../components/sign-up/sign-up.component";
import SignIn from "../../components/sign-in/sign-in.component";
import { SignUpInContainer } from "./sign-in-sign-up.styles";

class SignInSignUp extends Component {

  render () {
    return (
      <div>
        <SignUpInContainer>
          <SignIn />
          <SignUp />
        </SignUpInContainer>
      </div>
    );
  }
}

export default SignInSignUp;