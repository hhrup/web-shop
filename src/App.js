import React, { useState, useEffect } from 'react';
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

function App(props) {
  const [currentUser, setCurrentUser] = useState('');
  const [cartState, setCartState] = useState({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    numberOfCartItems: Number.parseInt(localStorage.getItem('numberOfCartItems')) || 0,
  });

  function addToCart(product) {
    let newCartItems;
    if (!cartState.cartItems.find(element => element.id === product.id))
      newCartItems = [...cartState.cartItems, product];
    else {
      newCartItems = cartState.cartItems;
      alert('Product already in cart!');
    }

    const newNumberOfCartItems = newCartItems?.length || cartState.cartItems.length;

    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    localStorage.setItem('numberOfCartItems', newNumberOfCartItems);

    if(newCartItems.length !== cartState.cartItems)
      setCartState({ cartItems: newCartItems, numberOfCartItems: newNumberOfCartItems});
  };

  function clearCart() {
    setCartState({ cartItems: [], numberOfCartItems: 0});
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser('');
      }
    });
  }, []);

  return(
    <div>
      <GlobalStyle />
      <Header currentUser={currentUser} numberOfCartItems={cartState.numberOfCartItems}/>
      <Switch>
        <Route exact path='/' >
          <Homepage currentUser={currentUser} addToCart={addToCart}/>
        </Route>
        <Route exact path='/createProduct'>
          <CreateProduct />
        </Route>
        <Route exact path='/signup'>
          <SignUp currentUser={currentUser}/>
        </Route>
        <Route exact path='/login'>
          <SignIn currentUser={currentUser}/>
        </Route>
        <Route exact path='/checkout'>
          <CheckoutPage cartItems={cartState.cartItems} currentUser={currentUser} clearCart={clearCart}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
