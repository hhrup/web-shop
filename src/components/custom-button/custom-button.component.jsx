import { Button } from './custom-button.styles';

const CustomButton = ({buttonContent, type, onClick}) => (
  <Button type={type} onClick={onClick}>{buttonContent}</Button>
);

export default CustomButton;
