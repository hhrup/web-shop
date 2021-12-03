import styled from 'styled-components';

export const InputContainer = styled.div`
  margin-bottom: 3.2rem;
`;

export const Input = styled.input`
  padding: 0.4rem;
  border: none;
  border-bottom: 1px solid;
  outline: none;
  transition: all 0.5s;

  &:focus {
    background-color: #f3f0ff;
  }
`;

export const Label = styled.label`
  padding-top: 0.4rem;
  display: block;
  font-size: 1.4rem;
`;