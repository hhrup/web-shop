import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import { ImgPreviewContainer, ImgFileNameSpan, Image, BtnAndSpanContainer } from './img-preview.styles';

const ImgPreview = ({buttonContent, onClick, spanContent, imgUrl}) => (
  <ImgPreviewContainer>
    <Image src={imgUrl} alt='product image'/>
    <BtnAndSpanContainer>
      <CustomButton buttonContent={buttonContent} onClick={onClick}/>
      <ImgFileNameSpan>{spanContent}</ImgFileNameSpan>
    </BtnAndSpanContainer>
  </ImgPreviewContainer>
);

export default ImgPreview;
