import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList'; // Adjust the import path as necessary
// import { Product } from '../services/productService';

describe('ProductList', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ];

  it('renders "No products found." when there are no products', () => {
    render(<ProductList products={[]} />);
    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });

  it('renders a list of products when products are provided', () => {
    render(<ProductList products={mockProducts} />);
    
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it('renders the correct number of ProductCard components', () => {
    render(<ProductList products={mockProducts} />);
    const productCards = screen.getAllByText(/Product/i);
    expect(productCards.length).toBe(mockProducts.length);
  });
});
