import styled from 'styled-components';
import ListIcon from '../../assets/ListIcon.svg';

export const ProductCardContainer = styled.div`
  border: 1px solid;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  width: 22rem;
  height: 38rem;
  transition: all 0.3s;

  &:hover {
    border-color: #7048e8;
    box-shadow: 0 0 1.6rem 0.8rem rgba(0, 0, 0, 0.075);
  }
`;

export const ProductImgContainer = styled.div`
  width: 20rem;
  height: 15rem;
`;

export const ProductImg = styled.img`
  width: 100%;
  height 100%;
`;

export const ProductName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  border-bottom: 1px solid;
`;

export const ProductDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

export const ProductDescriptionTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
`;

export const ProductDescriptionList = styled.ul`
  list-style: none;
  font-size: 1.4rem;
`;

export const ProductDescriptionListItem = styled.li`
  background: url(${ListIcon}) no-repeat left center;
  background-size: 1.4rem;
  padding-left: 1.6rem;
  padding-bottom: 0.4rem;
`;

export const ProductPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;