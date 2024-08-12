import { filtersReducer } from './filtersReducer'; // Adjust the import path as necessary

describe('filtersReducer', () => {
  const initialFilters = { category: 'electronics', priceRange: [100, 500] };

  it('should set filters when SET_FILTERS action is dispatched', () => {
    const action = { type: 'SET_FILTERS', payload: { category: 'books' } };
    const state = filtersReducer(initialFilters, action);
    expect(state).toEqual({ category: 'books', priceRange: [100, 500] });
  });

  it('should reset filters when RESET_FILTERS action is dispatched', () => {
    const action = { type: 'RESET_FILTERS' };
    const state = filtersReducer(initialFilters, action);
    expect(state).toEqual({});
  });

  it('should return the current state when an unknown action type is dispatched', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = filtersReducer(initialFilters, action);
    expect(state).toEqual(initialFilters);
  });
});
