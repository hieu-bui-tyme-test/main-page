import React, { useState, ChangeEvent } from 'react';
import { Filters } from '../services/productService';

interface FilterSidebarProps {
  filters: Filters,
  onFiltersChange: (filters: Filters) => void;
  onFiltersReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange, onFiltersReset }) => {
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
      case 'quickSearch':
      case 'category':
        onFiltersChange({ [name]: value });
        break;
      case 'minPrice':
      case 'maxPrice':
        onFiltersChange({ [name]: Number(value) });
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    onFiltersReset();
  };

  return (
    <aside className="filter-sidebar">
      <h2>Filters</h2>
      <div>
        <input className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker"
         type="text" name="quickSearch" value={filters.quickSearch} placeholder="Quick Search" required onChange={handleChange} />
      </div>
      <div>
        <label>Category</label>
        <select name="category" value={filters.category} onChange={handleChange}>
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
      <button onClick={handleReset}> Reset </button>
      {/* Add more filters as needed */}
    </aside>
  );
};

export default FilterSidebar;
