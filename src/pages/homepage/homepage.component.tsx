import React, { useEffect } from 'react';
import {
  HomePageContainer,
  MenuContainer,
  MenuItem,
  MenuTitle,
  MenuTitleAdmin
} from './homepage.styles';
import configData from '../../helperScripts/appConfig';
import ProductsGrid from '../../components/products-grid/products-grid.component';
import { fetchCategories, setCategory } from '../../redux/productsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

function Homepage() {
  const currentUser = useAppSelector(state => state.user);
  const menuCategoriesList = useAppSelector(state => state.products.menuCategoriesList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  function setStateProductsGrid(category: string) {
     localStorage.setItem('currentCategory', category);
     dispatch(setCategory(category));
  }

  function menuSetup(categoriesList: any[]) {
    if(categoriesList.length > 0) {
    const menuItemList = categoriesList.map((category, index) => (
    <MenuItem key={index} onClick={() => setStateProductsGrid(category)}>{category}</MenuItem>
    ));
    return menuItemList;
    }
  }

  return (
    <HomePageContainer>
      <MenuContainer>
        <MenuTitle>
          {
            currentUser.id === configData.adminFirebaseUserId ? 
            <MenuTitleAdmin to='/createProduct'>Add new product +</MenuTitleAdmin>
            : 'Categories'
          }
        </MenuTitle>
          {
            menuSetup(menuCategoriesList)
          }
      </MenuContainer>
      <ProductsGrid />
    </HomePageContainer>
  );
}

export default Homepage;
