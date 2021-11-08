import React, {Component} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase.auth';
import FormTitle from '../form-title/form-title.component';
import { Redirect } from 'react-router';
import { validateSignUp } from '../../helperScripts/validationFunctions';
import { SignUpPage } from './sign-up.styles';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { email, password, confirmPassword } = this.state;

    if (!validateSignUp(email, password, confirmPassword)) return;

    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
    });

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password, confirmPassword } = this.state;
    return (
      <SignUpPage>
        <form onSubmit={this.handleSubmit}>
          <FormTitle title='NEW USER' />
          <FormInput
            name='email'
            handleChange={this.handleChange}
            value={email}
            type='email'
            labelName='Email'
          />
          <FormInput
            name='password'
            handleChange={this.handleChange}
            value={password}
            type='password'
            labelName='Password'
          />
          <FormInput
            name='confirmPassword'
            handleChange={this.handleChange}
            value={confirmPassword}
            type='password'
            labelName='Confirm password'
          />
          <CustomButton type='submit' buttonContent='SIGN UP' />
          {this.props.currentUser && <Redirect to='/' />}
        </form>
      </SignUpPage>
    );
  }
};

export default SignUp;
