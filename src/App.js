import React, { Component } from 'react';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
      numberOfCartItems: Number.parseInt(localStorage.getItem('numberOfCartItems')) || 0,
    }

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(product) {
    let newCartItems;
    if (!this.state.cartItems.find(element => element.id === product.id))
      newCartItems = [...this.state.cartItems, product];
    else {
      newCartItems = this.state.cartItems;
      alert('Product already in cart!');
    }

    const newNumberOfCartItems = newCartItems?.length || this.state.cartItems.length;

    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    localStorage.setItem('numberOfCartItems', newNumberOfCartItems);

    if(newCartItems.length !== this.state.cartItems)
      this.setState( { cartItems: newCartItems, numberOfCartItems: newNumberOfCartItems});
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({currentUser: user});
      } else {
        this.setState({currentUser: ''});
      }
    });
  }

  render() {
    return(
      <div>
        <GlobalStyle />
        <Header currentUser={this.state.currentUser} numberOfCartItems={this.state.numberOfCartItems}/>
        <Switch>
          <Route exact path='/' >
            <Homepage currentUser={this.state.currentUser} addToCart={this.addToCart}/>
          </Route>
          <Route exact path='/createProduct'>
            <CreateProduct />
          </Route>
          <Route exact path='/signup'>
            <SignUp currentUser={this.state.currentUser}/>
          </Route>
          <Route exact path='/login'>
            <SignIn currentUser={this.state.currentUser}/>
          </Route>
          <Route exact path='/checkout'>
            <CheckoutPage cartItems={this.state.cartItems} currentUser={this.state.currentUser}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
