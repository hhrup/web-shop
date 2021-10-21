import React, {Component} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase.auth';
import FormTitle from '../form-title/form-title.component';

class SignUp extends Component {
  constructor() {
    super();
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

    if(!email) {
      alert(`eMail field cannot be empty!`);
      return;
    }

    if(!password) {
      alert(`Password field cannot be empty!`);
      return;
    }

    if(!confirmPassword) {
      alert(`Must confirm your password!`);
      return;
    }

    if (password !== confirmPassword) {
      alert(`Passwords do not match!`);
      return;
    }

    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
    });

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('YEAP', result);
    } catch (error) {
      console.error(error);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password, confirmPassword } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormTitle title='NEW USER'/>
        <FormInput
          name='email'
          handleChange={this.handleChange}
          value={email}
          type='email'
          // placeholder='email@example.com'
          labelName='Email'
        />
        <FormInput
          name='password'
          handleChange={this.handleChange}
          value={password}
          type='password'
          // placeholder='enter the password'
          labelName='Password'
        />
        <FormInput
          name='confirmPassword'
          handleChange={this.handleChange}
          value={confirmPassword}
          type='password'
          // placeholder='confirm password'
          labelName='Confirm password'
        />
        <CustomButton type='submit' name='SIGN UP' />
      </form>
    );
  }
};

export default SignUp;
