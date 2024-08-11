import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, Product, Filters, PageInfo } from '../services/productService'

export const useProducts = (filters: Filters, pageInfo: PageInfo) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);



  const loadProducts = useCallback(async (customPageInfo?: PageInfo) => {
    setLoading(true);
    try {
      const currentPageInfo = customPageInfo || pageInfo;
      const data = await fetchProducts(filters, currentPageInfo);

      if (currentPageInfo.page && currentPageInfo.page > 1) {
        setProducts((existingData) => [...existingData, ...data]);
      } else {
        setProducts(data);
      }
      setHasMore(Boolean(data.length));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, pageInfo]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const reloadProducts = () => {
    const currentPage = pageInfo.page || 1;
    const currentPerPage = pageInfo.perPage || 10;
    const numberOfItems = currentPage * currentPerPage;
    loadProducts({ page: 1, perPage: numberOfItems});
  };

  return { products, loading, error, hasMore, reloadProducts };
};
