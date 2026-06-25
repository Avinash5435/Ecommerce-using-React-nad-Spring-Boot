import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import client from '../api/client';
import ProductCard from '../components/ProductCard';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || '');

  const category = searchParams.get('category') || '';
  const query = searchParams.get('q') || '';

  useEffect(() => {
    client.get('/categories').then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  useEffect(() => {
    setSortOption(searchParams.get('sort') || '');
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);

    client
      .get(`/products?${params.toString()}`)
      .then(({ data }) => setProducts(data))
      .finally(() => setLoading(false));
  }, [query, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set('q', search.trim());
    if (category) params.set('category', category);
    if (sortOption) params.set('sort', sortOption);
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    if (value) params.set('sort', value);
    setSearchParams(params);
  };

  const clearSearch = () => {
    setSearch('');
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (sortOption) params.set('sort', sortOption);
    setSearchParams(params);
  };

  const handleCategoryFilter = (cat) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (cat && cat !== category) params.set('category', cat);
    if (sortOption) params.set('sort', sortOption);
    setSearchParams(params);
  };

  const sortedProducts = useMemo(() => {
    const items = [...products];
    switch (sortOption) {
      case 'price-asc':
        return items.sort((a, b) => Number(a.price) - Number(b.price));
      case 'price-desc':
        return items.sort((a, b) => Number(b.price) - Number(a.price));
      case 'name-asc':
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return items.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return items;
    }
  }, [products, sortOption]);

  return (
    <div className="container page">
      <h1 className="page-title">All Products</h1>
      {(query || category) && (
        <div className="search-summary">
          {query && <span>Showing results for <strong>"{query}"</strong></span>}
          {query && category && <span> · </span>}
          {category && <span>Category: <strong>{category}</strong></span>}
        </div>
      )}

      <div className="filters">
        <div className="search-row">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
            />
            <button type="submit" className="btn btn-primary">Search</button>
            {search && (
              <button type="button" className="btn btn-secondary ml-2" onClick={clearSearch}>
                Clear
              </button>
            )}
          </form>

          <div className="sort-select">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortOption} onChange={handleSortChange}>
              <option value="">Default</option>
              <option value="price-asc">Price low → high</option>
              <option value="price-desc">Price high → low</option>
              <option value="name-asc">Name A → Z</option>
              <option value="name-desc">Name Z → A</option>
            </select>
          </div>
        </div>

        <div className="filter-chips">
          <button
            type="button"
            className={`chip ${!category ? 'active' : ''}`}
            onClick={() => handleCategoryFilter('')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip ${category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">No products found.</div>
      ) : (
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
