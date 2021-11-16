import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase.auth';
import FormTitle from '../form-title/form-title.component';
import { Redirect } from 'react-router';
import { validateSignUp } from '../../helperScripts/validationFunctions';
import { SignUpPage } from './sign-up.styles';

function SignUp(props) {
  const [userData, setUserData] = useState({email: '', password: '', confirmPassword: ''})

  async function handleSubmit(e) {
    e.preventDefault();

    const { email, password, confirmPassword } = userData;

    if (!validateSignUp(email, password, confirmPassword)) return;

    setUserData({
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

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({...userData, [name]: value});
  };

  return (
    <SignUpPage>
      <form onSubmit={handleSubmit}>
        <FormTitle title='NEW USER' />
        <FormInput
          name='email'
          handleChange={handleChange}
          value={userData.email}
          type='email'
          labelName='Email'
        />
        <FormInput
          name='password'
          handleChange={handleChange}
          value={userData.password}
          type='password'
          labelName='Password'
        />
        <FormInput
          name='confirmPassword'
          handleChange={handleChange}
          value={userData.confirmPassword}
          type='password'
          labelName='Confirm password'
        />
        <CustomButton type='submit' buttonContent='SIGN UP' />
        {props.currentUser && <Redirect to='/' />}
      </form>
    </SignUpPage>
  );

};

export default SignUp;
