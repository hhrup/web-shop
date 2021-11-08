import styled from 'styled-components';

export const ProductsGridContainer = styled.div`
  display: grid;
  padding: 2.4rem 1.6rem 2.4rem 1.6rem;
  grid-template-columns: repeat( auto-fill, minmax(16rem, 1fr));
  gap: 1rem;
  justify-items: center;
  width: 80rem;
`;