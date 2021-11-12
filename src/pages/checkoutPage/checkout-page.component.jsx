import React from 'react';
import { CheckoutContainer, CheckoutGrid, Title, TakeMoneyContainer, ProductPrice } from './checkout-page.styles';
import ProductCard from '../../components/product-card/product-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const CheckoutPage = ({cartItems, currentUser}) => {
  const productCardList = cartItems.map(product => (
    <ProductCard
      key={product.id}
      id={product.id}
      category={product.category}
      imgUrl={product.imgUrl}
      productName={product.name}
      descriptionList={product.descriptionList}
      price={product.price}
      isCheckout={true}
      currentUser={currentUser}
    />
  ));

  return (
    <CheckoutContainer>
      <Title>CHECKOUT</Title>
      <CheckoutGrid>
        {productCardList}
      </CheckoutGrid>
      <TakeMoneyContainer>
        <ProductPrice>Total: {cartItems.reduce((prevValue, currentValue) => prevValue + Number.parseFloat(currentValue.price), 0)}$</ProductPrice>
        <CustomButton onClick={() => {localStorage.removeItem('cartItems'); localStorage.removeItem('numberOfCartItems');}} buttonContent='PAY NOW'/> button clears local storage
      </TakeMoneyContainer>
    </CheckoutContainer>
  );
}

export default CheckoutPage;