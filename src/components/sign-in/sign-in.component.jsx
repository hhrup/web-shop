import React, {Component} from "react";
import FormInput from "../form-input/form-input.component";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebase/firebase.auth';
import CustomButton from '../custom-button/custom-button.component';
import FormTitle from '../form-title/form-title.component';
import { SignInContainer, SignInWithGoogle, Separator } from './sign-in.styles';
import { signInWithPopup } from 'firebase/auth';

class SignIn extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
  }

  signInWithGoogle= async () => {

    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    //.then((result) => {
    //  // This gives you a Google Access Token. You can use it to access the Google API.
    //  const credential = GoogleAuthProvider.credentialFromResult(result);
    //  const token = credential.accessToken;
    //  // The signed-in user info.
    //  const user = result.user;
    //  // ...
    //}).catch((error) => {
    //  // Handle Errors here.
    //  const errorCode = error.code;
    //  const errorMessage = error.message;
    //  // The email of the user's account used.
    //  const email = error.email;
    //  // The AuthCredential type that was used.
    //  const credential = GoogleAuthProvider.credentialFromError(error);
    //  // ...
    //});
  }

  handleSubmit= async e => {
    e.preventDefault();
    const { email, password } = this.state;

    if(!email) {
      alert(`eMail field cannot be empty!`);
      return;
    }

    if(!password) {
      alert(`Password field cannot be empty!`);
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Signed in?', result);
    } catch (error) {
      console.error(error);
    }

    this.setState({
      email: '',
      password: '',
    });
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <SignInContainer>
        <form onSubmit={this.handleSubmit}>
          <FormTitle title='EXISTING USER' />
          <FormInput
            name='email'
            type='email'
            value={email}
            handleChange={this.handleChange}
            // placeholder='eMail'
            labelName='Email'
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={this.handleChange}
            // placeholder='password'
            labelName='Password'
          />
          <CustomButton type='submit' name='SIGN IN' />
        </form>

        <Separator />

        <SignInWithGoogle onClick={this.signInWithGoogle}/>
      </SignInContainer>
    );
  }
};

export default SignIn;