import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          Shop<span>Hub</span>
        </Link>

        <div className="nav-links">
          <Link to="/products">Products</Link>
          {isAuthenticated && (
            <Link to="/wishlist" className="wishlist-link">
              Wishlist
              {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
            </Link>
          )}
          {isAuthenticated && <Link to="/orders">Orders</Link>}
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-link">
            Cart
            {cart.itemCount > 0 && <span className="cart-badge">{cart.itemCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user.firstName}</span>
              <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
