import React, {Component} from "react";
import FormInput from "../form-input/form-input.component";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebase/firebase.auth';
import CustomButton from '../custom-button/custom-button.component';
import FormTitle from '../form-title/form-title.component';
import { SignInContainer, SignInWithGoogle, Separator } from './sign-in.styles';
import { signInWithPopup } from 'firebase/auth';
import { Redirect } from 'react-router';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      currentUser: props.currentUser,
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
            labelName='Email'
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={this.handleChange}
            labelName='Password'
          />
          <CustomButton type='submit' name='SIGN IN' />
        </form>

        <Separator>OR SIGN IN WITH:</Separator>

        <SignInWithGoogle onClick={this.signInWithGoogle}/>
        {
          this.props.currentUser && <Redirect to='/' />
        }
      </SignInContainer>
    );
  }
};

export default SignIn;