import React, {Component} from 'react';
import { ProductsGridContainer } from './products-grid.styles';
import ProductCard from '../product-card/product-card.component';
import { getCategoriesOrProducts } from '../../firebase/firebase.database';
import { deleteDocument } from '../../firebase/firebase.database';

class ProductsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productCardList: [],
    }
  }

  async deleteDoc(docId, productCat) {
    if(!window.confirm('Delete this product?')) return;
    await deleteDocument(docId, productCat);
    await this.handleCategory(productCat);
  }

  async handleCategory(category) {
    const productList = await getCategoriesOrProducts(category);
    if(!productList) return;

    const productCardList = productList.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          category={product.category}
          imgUrl={product.imgUrl}
          productName={product.name}
          descriptionList={product.description}
          price={product.price.toString()}
          currentUser={this.props.currentUser}
          deleteFunc={() => this.deleteDoc(product.id, product.category)}
          addToCart={
            () => this.props.addToCart({
              id: product.id,
              category: product.category,
              imgUrl: product.imgUrl,
              productName: product.name,
              descriptionList: product.description,
              price: product.price.toString()
            })}
        />
    ));

    this.setState({ productCardList: productCardList});
  }

  componentDidMount() {
    if(this.props.category)
      this.handleCategory(this.props.category);
  }

  componentDidUpdate(prevProps) {
    if(this.props.category) {
      if(prevProps.category !== this.props.category || prevProps.currentUser.uid !== this.props.currentUser.uid)
        this.handleCategory(this.props.category);
    }
  }

  render() {
    return (
    <ProductsGridContainer>
      {this.state.productCardList}
    </ProductsGridContainer>
  )}
}

export default ProductsGrid;
