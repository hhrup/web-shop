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
  ProductPrice
} from './product-card.styles';

function createProductDescList(descriptionList) {
  if(!descriptionList) return;

  const featuresList = descriptionList.split(';');
  return featuresList.map((feature, index) => <ProductDescriptionListItem key={index}>{feature}</ProductDescriptionListItem>);
}

const ProductCard = ({imgUrl, productName, descriptionList, price}) => (
  <ProductCardContainer>
    <ProductImgContainer>
      <ProductImg src={imgUrl} alt='Image of an product'/>
    </ProductImgContainer>
    <ProductName>{productName}</ProductName>
    <ProductDescriptionContainer>
      <ProductDescriptionTitle>PRODUCT DESCRIPTION</ProductDescriptionTitle>
      <ProductDescriptionList>
      {
        createProductDescList(descriptionList)
      }
      </ProductDescriptionList>
    </ProductDescriptionContainer>
    <ProductPrice>{price}$</ProductPrice>
    <CustomButton buttonContent='ADD TO CART'></CustomButton>
  </ProductCardContainer>
);

export default ProductCard;
