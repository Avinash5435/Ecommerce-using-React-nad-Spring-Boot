import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';

function WishlistButton({ productId }) {
  const { isAuthenticated } = useAuth();
  const { addToWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await addToWishlist(productId);
    } catch (err) {
      setError('Could not add to wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wishlist-button-wrapper">
      <button type="button" className="btn btn-outline" onClick={handleClick} disabled={loading}>
        {loading ? 'Saving...' : 'Add to Wishlist'}
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default WishlistButton;
