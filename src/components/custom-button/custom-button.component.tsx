import React from 'react';
import { Button } from './custom-button.styles';

const CustomButton = ({buttonContent, type, onClick} : Partial<{buttonContent: any, type: any, onClick: any}>) => (
  <Button type={type} onClick={onClick}>{buttonContent}</Button>
);

export default CustomButton;
