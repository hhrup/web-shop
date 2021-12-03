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
  ControlsContainer,
} from './product-card.styles';
import configData from '../../helperScripts/appConfig';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

function createProductDescList(descriptionList: string | undefined) {
  if (!descriptionList) return;
  const featuresList = descriptionList.split(';');
  return featuresList.map((feature, index) => (
    <ProductDescriptionListItem key={index}>
      {feature}
    </ProductDescriptionListItem>
  ));
}

interface ProductCardTypes {
  id: string;
  category: string;
  imgUrl: string;
  productName: string;
  descriptionList: string;
  price: number;
  deleteFunc: any;
  addToCart: any;
  isCheckout: boolean;
}

export default function ProductCard({
  id,
  category,
  imgUrl,
  productName,
  descriptionList,
  price,
  deleteFunc,
  addToCart,
  isCheckout,
}: Partial<ProductCardTypes>) {
  const currentUser = useAppSelector((state) => state.user);

  return (
    <ProductCardContainer>
      <ProductImgContainer>
        <ProductImg src={imgUrl} alt='Image of an product' />
      </ProductImgContainer>
      <ProductName>{productName}</ProductName>
      <ProductDescriptionContainer>
        <ProductDescriptionTitle>PRODUCT DETAILS</ProductDescriptionTitle>
        <ProductDescriptionList>
          {createProductDescList(descriptionList)}
        </ProductDescriptionList>
      </ProductDescriptionContainer>
      {currentUser.id === configData.adminFirebaseUserId && !isCheckout && (
        <ProductPrice>{price}$</ProductPrice>
      )}
      {isCheckout && <ProductPrice>{price}$</ProductPrice>}
      {currentUser.id === configData.adminFirebaseUserId && !isCheckout && (
        <ControlsContainer>
          <CustomButton
            type=''
            onClick={addToCart}
            buttonContent={<BtnCartIcon />}
          />
          <Link
            to={{
              pathname: '/createProduct',
              state: {
                id,
                category,
                imgUrl,
                productName,
                descriptionList,
                price,
              },
            }}
          >
            <CustomButton
              onClick={() => {}}
              buttonContent={<BtnEditIcon />}
            />
          </Link>
          <CustomButton
            onClick={deleteFunc}
            buttonContent={<BtnDeleteIcon />}
          />
        </ControlsContainer>
      )}
      {currentUser.id === configData.adminFirebaseUserId || isCheckout || (
        <ControlsContainer>
          <CustomButton
            onClick={addToCart}
            buttonContent={<BtnCartIcon />}
          />
          <ProductPrice>{price}$</ProductPrice>
        </ControlsContainer>
      )}
    </ProductCardContainer>
  );
}
