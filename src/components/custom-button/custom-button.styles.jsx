import styled, { css } from 'styled-components';

export const Button = styled.button`
  border-radius: 11px;
  background-color: #7048e8;
  color: #f3f0ff;
  padding: 0.6rem 1rem 0.6rem 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #7950f2;
    transform: scale(1.03, 1.03);
  }

  &:active {
    background-color: #6741d9;
  }
`;