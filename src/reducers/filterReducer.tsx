import { Filters } from '../services/productService';

type FiltersState = Filters;

type FiltersAction =
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_MIN_PRICE'; payload: number }
  | { type: 'SET_MAX_PRICE'; payload: number }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'RESET_FILTERS' };

export const filtersReducer = (state: FiltersState, action: FiltersAction): FiltersState => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_MIN_PRICE':
      return { ...state, minPrice: action.payload };
    case 'SET_MAX_PRICE':
      return { ...state, maxPrice: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'RESET_FILTERS':
      return {};
    default:
      return state;
  }
};
