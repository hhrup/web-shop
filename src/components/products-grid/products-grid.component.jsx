import React, { useState, useEffect } from 'react';
import { ProductsGridContainer } from './products-grid.styles';
import ProductCard from '../product-card/product-card.component';
import { getCategoriesOrProducts } from '../../firebase/firebase.database';
import { deleteDocument } from '../../firebase/firebase.database';

function ProductsGrid(props) {
  const [productCardListState, setProductCardListState] = useState([]);

  async function deleteDoc(docId, productCat) {
    if(!window.confirm('Delete this product?')) return;
    await deleteDocument(docId, productCat);
    await handleCategory(productCat);
  }

  async function handleCategory(category) {
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
         currentUser={props.currentUser}
         deleteFunc={() => deleteDoc(product.id, product.category)}
         addToCart={
           () => props.addToCart({
             id: product.id,
             category: product.category,
             imgUrl: product.imgUrl,
             productName: product.name,
             descriptionList: product.description,
             price: product.price.toString()
           })}
       />
    ));
    setProductCardListState(productCardList);
  }

  useEffect(() => {
    if(props.category)
      handleCategory(props.category);
  }, [props.category, props.currentUser, props.addToCart]);

  return (
    <ProductsGridContainer>
      {productCardListState}
    </ProductsGridContainer>
  )
}

export default ProductsGrid;
