import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import {
  ProductCardContainer,
  ProductImgContainer,
  ProductImg,
  ProductName,
  ProductDescriptionContainer,
  ProductDescriptionTitle,
  ProductDescriptionList,
  ProductDescriptionListItem,
  ProductPrice,
  BtnCartIcon,
  BtnEditIcon,
  BtnDeleteIcon,
  ControlsContainer
} from './product-card.styles';
import configData from '../../helperScripts/appConfig';
import { Link } from 'react-router-dom';

function createProductDescList(descriptionList) {
  if(!descriptionList) return;
  const featuresList = descriptionList.split(';');
  return featuresList.map((feature, index) => <ProductDescriptionListItem key={index}>{feature}</ProductDescriptionListItem>);
}

const ProductCard = ({id, category, imgUrl, productName, descriptionList, price, currentUser, deleteFunc, addToCart, isCheckout}) => (
  <ProductCardContainer>
    <ProductImgContainer>
      <ProductImg src={imgUrl} alt='Image of an product'/>
    </ProductImgContainer>
    <ProductName>{productName}</ProductName>
    <ProductDescriptionContainer>
      <ProductDescriptionTitle>PRODUCT DETAILS</ProductDescriptionTitle>
      <ProductDescriptionList>
      {
        createProductDescList(descriptionList)
      }
      </ProductDescriptionList>
    </ProductDescriptionContainer>
    { currentUser.uid === configData.adminFirebaseUserId && !isCheckout && <ProductPrice>{price}$</ProductPrice>}
    { isCheckout && <ProductPrice>{price}$</ProductPrice>}
    {
      currentUser.uid === configData.adminFirebaseUserId && !isCheckout &&
      <ControlsContainer>
        <CustomButton onClick={addToCart} buttonContent={<BtnCartIcon />} />
        <Link to={{pathname: '/createProduct', state: {id, category, imgUrl, productName, descriptionList, price}}}>
          <CustomButton buttonContent={<BtnEditIcon />} />
        </Link>
        <CustomButton onClick={deleteFunc} buttonContent={<BtnDeleteIcon />} />
      </ControlsContainer>
    }
    {
      currentUser.uid === configData.adminFirebaseUserId || isCheckout ||
        <ControlsContainer>
          <CustomButton onClick={addToCart} buttonContent={<BtnCartIcon />} />
          <ProductPrice>{price}$</ProductPrice>
        </ControlsContainer>
    }
  </ProductCardContainer>
);

export default ProductCard;
