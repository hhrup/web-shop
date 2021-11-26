import React, { useEffect } from 'react';
import { ProductsGridContainer } from './products-grid.styles';
import ProductCard from '../product-card/product-card.component';
import { deleteDocument } from '../../firebase/firebase.database';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { fetchProducts } from '../../redux/productsSlice';

function ProductsGrid() {
  const dispatch = useDispatch();

  const category = useSelector(state => state.products.category);
  const productList = useSelector(state => state.products.productList);

  useEffect(() => {
    dispatch(fetchProducts(category))
  }, [category]);

  async function deleteDoc(docId, productCat) {
    if(!window.confirm('Delete this product?')) return;
    await deleteDocument(docId, productCat);
    dispatch(fetchProducts(category));
  }

  function createListOfProductCards(productList) {
    if(productList.length === 0) return;

    const productCardList = productList.map(product => (
       <ProductCard
         key={product.id}
         id={product.id}
         category={product.category}
         imgUrl={product.imgUrl}
         productName={product.name}
         descriptionList={product.description}
         price={product.price.toString()}
         deleteFunc={() => deleteDoc(product.id, product.category)}
         addToCart={
           () => dispatch(addToCart({
             id: product.id,
             category: product.category,
             imgUrl: product.imgUrl,
             productName: product.name,
             descriptionList: product.description,
             price: product.price.toString()
           }))}
       />
    ));
    return productCardList;
  }

  return (
    <ProductsGridContainer>
      {createListOfProductCards(productList)}
    </ProductsGridContainer>
  )
}

export default ProductsGrid;
