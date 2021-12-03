import React from 'react';
import { Input, Label, InputContainer } from './form-input.styles';

interface FormInputTypes {
  isTextArea: boolean,
  isDataList: boolean,
  options: any,
  handleChange: any,
  labelName: string,
  name: string,
  type: string,
  value: any
}

const FormInput = ({
  isTextArea,
  isDataList,
  options,
  handleChange,
  labelName,
  name,
  type,
  value
} : Partial<FormInputTypes>) => (
  <InputContainer>
    {
      isTextArea && <textarea onChange={handleChange} name={name} value={value}></textarea>
    }
    {
      isDataList && (
        <div>
          <Input list='listOfData' onChange={handleChange} name={name} type={type} value={value}/>
          <datalist id='listOfData'>
            {options && options.map((element: string, index: number) => <option key={index} value={element}/>)}
          </datalist>
        </div>
        )
    }
    {
      isTextArea || isDataList || <Input onChange={handleChange} name={name} type={type} value={value}/>
    }
    <Label>{labelName}</Label>
  </InputContainer>
);

export default FormInput;