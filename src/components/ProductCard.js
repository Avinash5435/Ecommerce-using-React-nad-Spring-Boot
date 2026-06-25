import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="stock-badge">Only {product.stock} left</span>
        )}
        {product.stock === 0 && <span className="stock-badge out">Out of stock</span>}
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-price">${Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
