import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomePageContainer = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  column-gap: 2rem;
`;

export const ProductsGrid = styled.div`
  display: grid;
  padding: 2.4rem 1.6rem 2.4rem 1.6rem;
  grid-template-columns: repeat( auto-fill, minmax(16rem, 1fr));
  gap: 1rem;
  justify-items: center;
  width: 80rem;
`;

export const MenuContainer = styled.div`
  width: 25rem;
  margin-top: 2.4rem;
  padding: 1rem;
  border: 1px solid;
  border-radius: 6px;
  background-color: #f3f0ff;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const MenuTitle = styled.div`
  font-size: 2rem;
  font-weight: 500;
  border-bottom: 1px solid;
  cursor: pointer;
`;

export const MenuTitleAdmin = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const MenuItem = styled.div`
  font-size: 1.6rem;
  border-bottom: 1px solid;
  cursor: pointer;
`;
