import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import { ImgPreviewContainer, ImgFileNameSpan, Image, BtnAndSpanContainer } from './img-preview.styles';

interface ImgPreviewTypes {
  buttonContent: string, onClick: any, spanContent: string, imgUrl: string
}

const ImgPreview = ({buttonContent, onClick, spanContent, imgUrl}: ImgPreviewTypes) => (
  <ImgPreviewContainer>
    <Image src={imgUrl} alt='product image'/>
    <BtnAndSpanContainer>
      <CustomButton buttonContent={buttonContent} onClick={onClick}/>
      <ImgFileNameSpan>{spanContent}</ImgFileNameSpan>
    </BtnAndSpanContainer>
  </ImgPreviewContainer>
);

export default ImgPreview;
