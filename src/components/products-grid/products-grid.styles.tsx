import styled from 'styled-components';

export const ProductsGridContainer = styled.div`
  display: grid;
  padding: 2.4rem 0;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1rem;
  justify-items: center;
  width: 80vw;
`;
