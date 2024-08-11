import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { Filters, PageInfo } from "../services/productService";
import ProductList from "../components/ProductList";
import FilterSidebar from "../components/FilterSidebar";
import { useFilters } from "../reducers/filtersReducer";
import { usePageInfo } from "../reducers/pageInfoReducer";

const initialFilters: Filters = { priceSortOrder: 'ASC' };
const initialPageInfo: PageInfo = { page: 1 };

const AUTO_RELOAD_TIMEOUT = 60000;

function ProdductPage() {
  const { filters, updateFilters, resetFilters } = useFilters(initialFilters);
  const { pageInfo, nextPage, resetPage } = usePageInfo(initialPageInfo);

  const { products, loading, hasMore, reloadProducts } = useProducts(filters, pageInfo);

  const handleFilterChange = (filters: Filters) => {
    updateFilters(filters);
    resetPage();
  };

  const handleFilterReset = () => {
    resetFilters();
    resetPage();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Auto Refreshing');
      reloadProducts();
    }, AUTO_RELOAD_TIMEOUT);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pageInfo])

  return (
    <>
      <section className="bg-white py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12 flex-col md:flex-row">
          <aside className="flex-shrink-0 w-full md:w-64 bg-white md:border-r p-6">
            <FilterSidebar filters={filters} onFiltersChange={handleFilterChange} onFiltersReset={handleFilterReset}/>
          </aside>
          <main className="flex flex-col flex-1">
            <ProductList products={products} />
            { hasMore && !loading && <div className="flex justify-center">
              <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={nextPage}>Load more</button>
            </div>}
          </main>
          
        </div>
      </section>
    </>
  );
}

export default ProdductPage;
