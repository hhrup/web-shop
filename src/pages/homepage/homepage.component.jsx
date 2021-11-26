import React, { useState, useEffect } from 'react';
import {
  HomePageContainer,
  MenuContainer,
  MenuItem,
  MenuTitle,
  MenuTitleAdmin
} from './homepage.styles';
import { getCategoriesOrProducts } from '../../firebase/firebase.database';
import configData from '../../helperScripts/appConfig';
import ProductsGrid from '../../components/products-grid/products-grid.component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, setCategory } from '../../redux/productsSlice';

function Homepage() {
  const currentUser = useSelector(state => state.user);
  const menuCategoriesList = useSelector(state => state.products.menuCategoriesList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  function setStateProductsGrid(category) {
     localStorage.setItem('currentCategory', category);
     dispatch(setCategory(category));
  }

  function menuSetup(categoriesList) {
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
