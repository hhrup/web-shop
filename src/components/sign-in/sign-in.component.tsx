import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebase/firebase.auth';
import CustomButton from '../custom-button/custom-button.component';
import FormTitle from '../form-title/form-title.component';
import { SignInContainer, SignInWithGoogle, Separator, SignInPage } from './sign-in.styles';
import { signInWithPopup } from 'firebase/auth';
import { Redirect } from 'react-router';
import { validateSignIn } from "../../helperScripts/validationFunctions";
import Loader from "../loader/loader.component";
import { useAppSelector } from "../../redux/hooks";

function SignIn() {
  const currentUser = useAppSelector(state => state.user);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    isLoading: false,
  });

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const { email, password } = userData;

    if (!validateSignIn(email, password)) return;

    setUserData({...userData, isLoading: true})

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  function handleChange(e: any) {
    const { name, value } = e.target;

    setUserData({...userData, [name]: value});
  }

  const { email, password } = userData;
  return (
    <SignInPage>
      <SignInContainer>
        <form onSubmit={handleSubmit}>
          <FormTitle title='EXISTING USER' />
          <FormInput
            name='email'
            type='email'
            value={email}
            handleChange={handleChange}
            labelName='Email'
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={handleChange}
            labelName='Password'
          />
          <CustomButton type='submit' buttonContent='LOG IN' />
        </form>

        <Separator>OR SIGN IN WITH:</Separator>

        <SignInWithGoogle onClick={signInWithGoogle} />

        {userData.isLoading && <Loader />}

        {currentUser.id && <Redirect to='/' />}
      </SignInContainer>
    </SignInPage>
  );
};

export default SignIn;
