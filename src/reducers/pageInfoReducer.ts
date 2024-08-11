import { useReducer } from 'react';
import { PageInfo } from '../services/productService';

type PageInfoAction =
  | { type: 'NEXT_PAGE' }
  | { type: 'SET_PAGE'; payload: PageInfo };

export const pageInfoReducer = (state: PageInfo, action: PageInfoAction): PageInfo => {
  switch (action.type) {
    case 'NEXT_PAGE':
      return { ...state, page: (state?.page || 0) + 1 };
    case 'SET_PAGE':
      return { ...state, page: action.payload.page, perPage: action.payload.perPage };
    default:
      return state;
  }
};

// Action creators
export function usePageInfo(initialPageInfo: PageInfo) {
  const [state, dispatch] = useReducer(pageInfoReducer, initialPageInfo);

  const set = (payload: PageInfo) => dispatch({ type: 'SET_PAGE', payload });
  const reset = () => dispatch({ type: 'SET_PAGE', payload: initialPageInfo });
  const next = () => dispatch({ type: 'NEXT_PAGE' });

  return { pageInfo: state, setPage: set, nextPage: next, resetPage: reset };
}
