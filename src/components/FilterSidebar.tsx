import React, { useState, ChangeEvent, useEffect } from 'react';
import { Filters } from '../services/productService';
import useDebounce from '../hooks/useDebounce';
import Input from './ui/Input';
import SearchInput from './ui/SearchInput';
import Select from './ui/Select';

type FilterSidebarProps = {
  filters: Filters,
  onFiltersChange: (filters: Filters) => void;
  onFiltersReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange, onFiltersReset }) => {
  const [quickSearch, setQuickSearch] = useState<string | undefined>(filters.quickSearch);
  const quickSearchDebounced = useDebounce(quickSearch, 300);

  useEffect(() => {
    if (typeof quickSearchDebounced !== 'undefined') {
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
      default:
        onFiltersChange({ [name]: value });
        break;
    }
  };

  const handleReset = () => {
    setQuickSearch('');
    onFiltersReset();
  };

  return (
    <aside className="filter-sidebar">
      <h4 className="font-semibold mb-4">Filter</h4>

      <SearchInput name="quickSearch" id="quickSearch" placeholder="Quick Search..." aria-label="Quick Search" value={quickSearch || ''} onChange={handleChange} />

      <Select name="category" id="category" aria-label="Category" value={filters.category || ''} onChange={handleChange} >
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </Select>

      <Input type="number" name="minPrice" id="minPrice" placeholder="Min" aria-label="Min Price" value={filters.minPrice || ''} onChange={handleChange}  />

      <Input type="number" name="maxPrice" id="maxPrice" placeholder="Max" aria-label="Max Price" value={filters.maxPrice || ''} onChange={handleChange}  />

      <Select name="priceSortOrder" id="priceSortOrder" aria-label="Sort" value={filters.priceSortOrder || ''} onChange={handleChange} >
        <option value="ASC">Low to high</option>
        <option value="DESC">High to low</option>
      </Select>

      <div className="mt-6">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded text-sm" onClick={handleReset}>
          Reset
        </button>
      </div>

    </aside>
  );
};

export default FilterSidebar;
