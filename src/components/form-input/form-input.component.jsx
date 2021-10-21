import React from 'react';
import { Input, Label, InputContainer } from './form-input.styles';

const FormInput = ({handleChange, labelName, ...otherProps}) => (
  <InputContainer>
    <Input onChange={handleChange} {...otherProps}/>
    <Label>{labelName}</Label>
  </InputContainer>

);

export default FormInput;