import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../services/productService';

type ProductListProps = {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products.length) {
    return <p>No products found.</p>;
  }

  return (
    <div className="product-list flex flex-wrap flex-1 h-full overflow-x-hidden overflow-y-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
