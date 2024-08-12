import { useReducer } from 'react';
import { Filters } from '../services/productService';

type FiltersState = Filters;

export type FiltersAction =
  | { type: 'SET_FILTERS'; payload: Filters }
  | { type: 'RESET_FILTERS' };

export const filtersReducer = (state: FiltersState, action: FiltersAction): FiltersState => {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...state, ...action.payload };
    case 'RESET_FILTERS':
      return {};
    default:
      return state;
  }
};

// Action creators
export function useFilters(initialFilters: Filters) {
  const [state, dispatch] = useReducer(filtersReducer, initialFilters);

  const update = (payload: Filters) => dispatch({ type: 'SET_FILTERS', payload });
  const reset = () => dispatch({ type: 'RESET_FILTERS' });

  return { filters: state, updateFilters: update, resetFilters: reset };
}
