import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([client.get('/products'), client.get('/categories')])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.data.slice(0, 4));
        setCategories(categoriesRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container hero-content">
          <h1>Discover products you&apos;ll love</h1>
          <p>Shop the latest electronics, fashion, home goods, and more with fast checkout.</p>
          <Link to="/products" className="btn btn-primary btn-lg">Browse Products</Link>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">Shop by Category</h2>
            <div className="category-grid">
              {categories.map((cat) => (
                <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`} className="category-chip">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="link-more">View all →</Link>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
