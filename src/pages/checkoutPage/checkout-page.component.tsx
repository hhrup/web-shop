import React, { useState, useEffect } from 'react';
import { CheckoutContainer, CheckoutGrid, Title, TakeMoneyContainer, ProductPrice } from './checkout-page.styles';
import ProductCard from '../../components/product-card/product-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { clearCart } from '../../redux/cartSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';


function CheckoutPage() {
  const [productCardList, setProductCardList] = useState([] as any[]);
  const [totalPrice, setTotalPrice] = useState(0);

  const cartItems = useAppSelector(state => state.cart.cartItems);
  const dispatch = useAppDispatch();

    useEffect(() => {
      setProductCardList(cartItems.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          category={product.category}
          imgUrl={product.imgUrl}
          productName={product.name}
          descriptionList={product.descriptionList}
          price={product.price}
          isCheckout={true}
        />
      )));

      setTotalPrice(cartItems.reduce((prevValue, currentValue) => prevValue + Number.parseFloat(currentValue.price), 0));
    }, [cartItems]);

  return (
    <CheckoutContainer>
      <Title>CHECKOUT</Title>
      <CheckoutGrid>
        {productCardList}
      </CheckoutGrid>
      <TakeMoneyContainer>
        <ProductPrice>
          Total: {totalPrice}$
        </ProductPrice>
        <CustomButton onClick={
          () => {
            localStorage.removeItem('cartItems');
            localStorage.removeItem('numberOfCartItems');
            dispatch(clearCart());
            setProductCardList([]);
            setTotalPrice(0);
          }} buttonContent='PAY NOW'/> button clears local storage and cart
      </TakeMoneyContainer>
    </CheckoutContainer>
  );
}

export default CheckoutPage;
