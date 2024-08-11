import { useState, useEffect } from 'react';
import { fetchProducts, Product, Filters, PageInfo } from '../services/productService';

export const useProducts = (filters: Filters, pageInfo: PageInfo) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(filters, pageInfo);

        if (pageInfo.page && pageInfo.page > 1) {
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
    };

    loadProducts();
  }, [filters, pageInfo]);

  return { products, loading, error, hasMore };
};
