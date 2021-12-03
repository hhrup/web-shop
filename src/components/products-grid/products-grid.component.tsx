import React, { useEffect } from 'react';
import { ProductsGridContainer } from './products-grid.styles';
import ProductCard from '../product-card/product-card.component';
import { deleteDocument } from '../../firebase/firebase.database';
import { addToCart } from '../../redux/cartSlice';
import { fetchProducts } from '../../redux/productsSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

function ProductsGrid() {
  const dispatch = useAppDispatch();

  const category = useAppSelector(state => state.products.category);
  const productList = useAppSelector(state => state.products.productList);

  useEffect(() => {
    dispatch(fetchProducts(category))
  }, [category]);

  async function deleteDoc(docId: string, productCat: string) {
    if(!window.confirm('Delete this product?')) return;
    await deleteDocument(docId, productCat);
    dispatch(fetchProducts(category));
  }

  function createListOfProductCards(productList: any[]) {
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
         isCheckout={false}
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
