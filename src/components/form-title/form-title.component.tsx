import React from 'react';
import { FormTitleComponent } from './form-title.styles';

const FormTitle = ({title} : {title: string}) => (
  <FormTitleComponent>{title}</FormTitleComponent>
);

export default FormTitle;
