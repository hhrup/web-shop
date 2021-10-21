import { Button } from './custom-button.styles';

const CustomButton = ({name, type}) => (
  <Button type={type}>{name}</Button>
);

export default CustomButton;