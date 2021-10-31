import React from 'react';
import { Input, Label, InputContainer } from './form-input.styles';

const FormInput = ({
  isTextArea,
  isDataList,
  options,
  handleChange,
  labelName,
  ...otherProps
}) => (
  <InputContainer>
    {
      isTextArea && <textarea onChange={handleChange} {...otherProps}></textarea>
    }
    {
      isDataList && (
        <div>
          <Input list='listOfData' onChange={handleChange} {...otherProps} />
          <datalist id='listOfData'>
            {options && options.map((element, index) => <option key={index} value={element}/>)}
          </datalist>
        </div>
        )
    }
    {
      isTextArea || isDataList || <Input onChange={handleChange} {...otherProps} />
    }
    <Label>{labelName}</Label>
  </InputContainer>
);

export default FormInput;