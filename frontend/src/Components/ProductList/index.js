import React from 'react';

import Product from './Product';
import EmptyProduct from './EmptyProduct';

const ProductList = ({ products }) => {
  console.log(products)
  return products.map(p => {
    if(p.id !== -1){
    return <Product product={p} key={p._id} products={products}/>;
    } else {
      return <EmptyProduct product={p} key={p._id} products={products}/>;
    }
  });
};

export default ProductList;