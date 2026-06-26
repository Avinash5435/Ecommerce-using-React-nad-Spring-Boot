import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

function Wishlist() {
  const { isAuthenticated } = useAuth();
  const { wishlist, loading, fetchWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated, fetchWishlist]);

  if (!isAuthenticated) {
    return (
      <div className="container page">
        <div className="empty-state">
          <p>Please log in to view your wishlist.</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container page">
        <div className="loading">Loading wishlist...</div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="container page">
        <h1 className="page-title">Your Wishlist</h1>
        <div className="empty-state">
          <p>Your wishlist is empty.</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1 className="page-title">Your Wishlist</h1>
      <div className="product-grid wishlist-grid">
        {wishlist.map((item) => (
          <div key={item.productId} className="product-card wishlist-card">
            <img src={item.imageUrl} alt={item.name} />
            <div className="product-info">
              <span className="product-category">{item.category}</span>
              <h3>{item.name}</h3>
              <p className="product-price">${Number(item.price).toFixed(2)}</p>
              <div className="wishlist-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate(`/products/${item.productId}`)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    setRemovingId(item.productId);
                    await removeFromWishlist(item.productId);
                    setRemovingId(null);
                  }}
                  disabled={removingId === item.productId}
                >
                  {removingId === item.productId ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
