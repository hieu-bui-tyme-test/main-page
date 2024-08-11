import React, { useState, ChangeEvent, useEffect } from 'react';
import { Filters } from '../services/productService';
import useDebounce from '../hooks/useDebounce';

type FilterSidebarProps = {
  filters: Filters,
  onFiltersChange: (filters: Filters) => void;
  onFiltersReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange, onFiltersReset }) => {
  const [quickSearch, setQuickSearch] = useState<string>(filters.quickSearch || '');
  const quickSearchDebounced = useDebounce(quickSearch, 300);

  useEffect(() => {
    if (quickSearchDebounced) {
      onFiltersChange({ quickSearch: quickSearchDebounced });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickSearchDebounced]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'quickSearch':
        setQuickSearch(value);
        break;
      case 'category':
        onFiltersChange({ category: value });
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
    setQuickSearch('');
    onFiltersReset();
  };

  return (
    <aside className="filter-sidebar">
      <h2>Filters</h2>
      <div>
        <input className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker"
         type="text" name="quickSearch" value={quickSearch} placeholder="Quick Search" required onChange={handleChange} />
      </div>
      <div>
        <label>Category</label>
        <select name="category" value={filters.category || ''} onChange={handleChange}>
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>
      <div>
        <label>Price Range</label>
        <input type="number" name="minPrice" placeholder="Min" value={filters.minPrice || 0} onChange={handleChange} />
        <input type="number" name="maxPrice" placeholder="Max" value={filters.maxPrice || 0} onChange={handleChange} />
      </div>
      <button onClick={handleReset}> Reset </button>
    </aside>
  );
};

export default FilterSidebar;
