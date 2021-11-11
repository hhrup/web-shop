import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 6rem;
  margin-bottom: 2.4rem;
`;

  export const Title = styled.div`
  padding-top: 2.4rem;
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
  align-self: center;
`;

export const CheckoutGrid = styled.div`
  display: grid;
  padding: 2.4rem 1.6rem 2.4rem 1.6rem;
  grid-template-columns: repeat( auto-fill, minmax(16rem, 1fr));
  gap: 1rem;
  justify-items: center;
  width: 80rem;
`;

export const TakeMoneyContainer = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  align-self: center;
`;

export const ProductPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;