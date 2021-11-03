import React, { Component } from 'react';
import { HomePageContainer, ProductsGrid } from './homepage.styles';
import configData from '../../helperScripts/appConfig';
import {} from '../../firebase/firebase.database';
import ProductCard from '../../components/product-card/product-card.component';
import { getCategoriesOrProducts } from '../../firebase/firebase.database';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.imgInput = React.createRef();
    this.textInput = React.createRef();
    this.state = {
      productCardList: [],
      imgUrl: JSON.parse(window.localStorage.getItem('imgUrl')) || '',
    }

    // this.getProductsAndPopulateGrid = this.getProductsAndPopulateGrid.bind(this);
  }

  /*
    TODO
    Main screen showing products from different categories
    choose a category and a filter then show populate the grid with data
  */

  async getProductsAndPopulateGrid() {
    try {
      return await getCategoriesOrProducts('gpu');
    } catch (error) {
      console.error(error);
    }
  }
  
  async componentDidMount() {
    const productList = await this.getProductsAndPopulateGrid()
    console.log(productList);
    const productCardList = productList.map((product) => (
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
  // {
  // this.props.currentUser.uid === configData.adminFirebaseUserId && <h3>ADMIN CONTROLS </h3>
  // } 

  render() {
  return (
    <HomePageContainer>
      <ProductsGrid>
        {this.state.productCardList}
      </ProductsGrid>
    </HomePageContainer>
  );
  }
}

export default Homepage;
