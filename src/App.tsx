import React, { useEffect } from 'react';
import Header from './components/header/header.component';
import GlobalStyle from './globalStyles';
import { Route, Switch } from 'react-router';
import Homepage from './pages/homepage/homepage.component';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase.auth';
import CreateProduct from './components/create-product/create-product.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
import CheckoutPage from './pages/checkoutPage/checkout-page.component';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCurrentUser({ email: user.email, id: user.uid }));
      } else {
        dispatch(setCurrentUser({ email: '', id: '' }));
      }
    });
  }, []);

  return(
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path='/' >
          <Homepage />
        </Route>
        <Route exact path='/createProduct'>
          <CreateProduct />
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route exact path='/login'>
          <SignIn />
        </Route>
        <Route exact path='/checkout'>
          <CheckoutPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
