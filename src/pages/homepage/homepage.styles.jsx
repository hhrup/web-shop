import styled from 'styled-components';

export const HomePageContainer = styled.div`
  margin: 2.4rem;
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(22rem, 1fr));
  gap: 2.4rem;
  justify-items: center;
`;
