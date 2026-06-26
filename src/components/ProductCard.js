import { Link } from 'react-router-dom';
import WishlistButton from './WishlistButton';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link">
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
      <div className="product-card-actions">
        <WishlistButton productId={product.id} />
      </div>
    </div>
  );
}

export default ProductCard;
