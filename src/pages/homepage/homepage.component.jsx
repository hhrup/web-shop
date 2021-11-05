import React, { Component } from 'react';
import {
  HomePageContainer,
  ProductsGrid,
  MenuContainer,
  MenuItem,
  MenuTitle,
  MenuTitleAdmin
} from './homepage.styles';
import ProductCard from '../../components/product-card/product-card.component';
import { getCategoriesOrProducts, getCategories } from '../../firebase/firebase.database';
import configData from '../../helperScripts/appConfig';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.imgInput = React.createRef();
    this.textInput = React.createRef();
    this.state = {
      productCardList: [],
      menuItemList: [],
      imgUrl: JSON.parse(window.localStorage.getItem('imgUrl')) || '',
    }
  }

  async getCategories() {
    try {
      return await getCategories();
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts(category) {
    try {
      return await getCategoriesOrProducts(`${category}`);
    } catch (error) {
      console.error(error);
    }
  }

  async handleCategory(category) {
    const productList = await this.getProducts(category)
    const productCardList = productList.map(product => (
        <ProductCard
          key={product.id}
          imgUrl={product.imgUrl}
          productName={product.name}
          descriptionList={product.description}
          price={product.price.toString()}
        />
    ));

    this.setState({productCardList: productCardList});
  }

  async componentDidMount() {
    const categoriesList = await this.getCategories();
    const menuItemList = categoriesList.map((category, index) => (
      <MenuItem key={index} onClick={() => this.handleCategory(category)}>{category}</MenuItem>
    ));

    this.setState({menuItemList: menuItemList});
  }

  // {
  // this.props.currentUser.uid === configData.adminFirebaseUserId && <h3>ADMIN CONTROLS </h3>
  // }

  render() {
    return (
      <HomePageContainer>
        <MenuContainer>
          <MenuTitle>
          {
            this.props.currentUser.uid === configData.adminFirebaseUserId ? 
            <MenuTitleAdmin to='/createProduct'>Add new category +</MenuTitleAdmin>
            : 'Categories'
          }
          </MenuTitle>
          {
            this.state.menuItemList
          }
        </MenuContainer>
        <ProductsGrid>
          {
            this.state.productCardList
          }
        </ProductsGrid>
      </HomePageContainer>
    );
  }
}

export default Homepage;
