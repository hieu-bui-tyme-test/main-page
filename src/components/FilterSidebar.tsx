import React, { useState, ChangeEvent } from 'react';
import { Filters } from '../services/productService';

interface FilterSidebarProps {
  onFilterChange: (filters: Filters) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  // const [filters, setFilters] = useState<Filters>({});

  // const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   const newFilters = { ...filters, [name]: value };
  //   setFilters(newFilters);
  //   onFilterChange(newFilters);
  // };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'category':
        onFilterChange({ category: value });
        break;
      case 'minPrice':
        onFilterChange({ minPrice: Number(value) });
        break;
      case 'maxPrice':
        onFilterChange({ maxPrice: Number(value) });
        break;
      default:
        break;
    }
  };

  return (
    <aside className="filter-sidebar">
      <h2>Filters</h2>
      <div>
        <input className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker"
         type="text" name="name_like" placeholder="Quick Search" required onChange={handleChange} />
      </div>
      <div>
        <label>Category</label>
        <select name="category" onChange={handleChange}>
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div>
        <label>Price Range</label>
        <input type="number" name="minPrice" placeholder="Min" onChange={handleChange} />
        <input type="number" name="maxPrice" placeholder="Max" onChange={handleChange} />
      </div>
      {/* Add more filters as needed */}
    </aside>
  );
};

export default FilterSidebar;
