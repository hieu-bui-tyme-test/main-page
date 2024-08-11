
export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export type Filters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  quickSearch?: string;
  priceSortOrder?: string;
}

export type PageInfo = {
  page?: number;
  perPage?: number;
}

function filterQueryParams(params: { [key: string]: unknown }): { [key: string]: unknown } {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );
}

export const fetchProducts = async (params: Filters = {}, pageInfo: PageInfo): Promise<Product[]> => {
  try {
    // _like, _lte, _gte... are json-server syntax
    const queryParamsObject = {
      'name_like': params.quickSearch,
      'price_lte': params.maxPrice,
      'price_gte': params.minPrice,
      'category_like': params.category,
      '_sort': 'price',
      '_order': params.priceSortOrder,
      '_page': pageInfo.page,
      '_limit': pageInfo.perPage
    };
    const filteredParams = filterQueryParams(queryParamsObject);
    const queryParams = new URLSearchParams(filteredParams as Record<string, string>).toString();
    const response = await fetch(`https://json-server-vercel-virid-psi.vercel.app/api/products?${queryParams}`);
    // const response = await fetch(`http://localhost:3000/api/products?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
