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

function Homepage(props) {
  const [menuItemList, setMenuItemList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(localStorage.getItem('currentCategory') || '');

  function setStateProductsGrid(category) {
      localStorage.setItem('currentCategory', category)
      setCurrentCategory(category);
  }

  async function menuSetup() {
    const categoriesList = await getCategoriesOrProducts('productCategories');
    const menuItemList = categoriesList.map((category, index) => (
    <MenuItem key={index} onClick={() => setStateProductsGrid(category)}>{category}</MenuItem>
    ));
    setMenuItemList([...menuItemList]);
  }

  useEffect(() => {
    menuSetup();
  }, []);

  return (
    <HomePageContainer>
      <MenuContainer>
        <MenuTitle>
          {
            props.currentUser.uid === configData.adminFirebaseUserId ? 
            <MenuTitleAdmin to='/createProduct'>Add new product +</MenuTitleAdmin>
            : 'Categories'
          }
        </MenuTitle>
          {
            menuItemList
          }
      </MenuContainer>
      <ProductsGrid 
        category={currentCategory}
        currentUser={props.currentUser}
        addToCart={props.addToCart}
        />
    </HomePageContainer>
  );
}

export default Homepage;
