import React, { Component } from 'react';
import {
  HomePageContainer,
  // ProductsGrid,
  MenuContainer,
  MenuItem,
  MenuTitle,
  MenuTitleAdmin
} from './homepage.styles';
import { getCategoriesOrProducts } from '../../firebase/firebase.database';
import configData from '../../helperScripts/appConfig';
import ProductsGrid from '../../components/products-grid/products-grid.component';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productCardList: [],
      menuItemList: [],
      currentCategory: '',
    }
  }

  setStateProductsGrid(category) {
    this.setState({currentCategory: category});
  }

  async componentDidMount() {
    const categoriesList = await getCategoriesOrProducts('productCategories');
    const menuItemList = categoriesList.map((category, index) => (
      <MenuItem key={index} onClick={() => this.setStateProductsGrid(category)}>{category}</MenuItem>
    ));
    this.setState({menuItemList: menuItemList});
  }

  render() {
    return (
      <HomePageContainer>
        <MenuContainer>
          <MenuTitle>
          {
            this.props.currentUser.uid === configData.adminFirebaseUserId ? 
            <MenuTitleAdmin to='/createProduct'>Add new product +</MenuTitleAdmin>
            : 'Categories'
          }
          </MenuTitle>
          {
            this.state.menuItemList
          }
        </MenuContainer>
        <ProductsGrid category={this.state.currentCategory} currentUser={this.props.currentUser}/>
      </HomePageContainer>
    );
  }
}

export default Homepage;
