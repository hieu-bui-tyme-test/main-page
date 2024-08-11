
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  // Add other fields as needed
}

export interface Filters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  quickSearch?: string;
}

export const fetchProducts = async (filters: Filters = {}): Promise<Product[]> => {
  try {
    const queryParams = new URLSearchParams(filters as Record<string, string>).toString();
    // const response = await fetch(`https://api.example.com/products?${queryParams}`);
    // const response = await fetch(`https://json-server-vercel-virid-psi.vercel.app/api/products?_end=10`);
    const response = await fetch(`http://localhost:3000/api/products?_end=10&${queryParams}`);
    
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
