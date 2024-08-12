import { fetchProducts } from './productService';
import { vi } from 'vitest';

global.fetch = vi.fn();

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)), ok: true }
}

describe('fetchProducts', () => {
  beforeEach(() => {
    // Reset mock before each test
    fetch.mockReset();
  });

  it('should construct the correct query parameters', async () => {
    const filters = {
      category: 'electronics',
      minPrice: 100,
      maxPrice: 500,
      quickSearch: 'phone',
      priceSortOrder: 'asc',
    };
    const pageInfo = { page: 1, perPage: 10 };

    // Mock an empty response
    fetch.mockResolvedValue(createFetchResponse([]));

    await fetchProducts(filters, pageInfo);

    const expectedUrl = 'https://json-server-vercel-virid-psi.vercel.app/api/products?name_like=phone&price_lte=500&price_gte=100&category_like=electronics&_sort=price&_order=asc&_page=1&_limit=10';
    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it('should fetch products successfully', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 100, imageUrl: 'url1', category: 'electronics' },
      { id: 2, name: 'Product 2', price: 200, imageUrl: 'url2', category: 'electronics' },
    ];

    fetch.mockResolvedValue(createFetchResponse(mockProducts));

    const products = await fetchProducts({}, { page: 1, perPage: 10 });

    expect(products).toEqual(mockProducts);
  });

});
