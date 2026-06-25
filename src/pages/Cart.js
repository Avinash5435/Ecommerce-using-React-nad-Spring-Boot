import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { isAuthenticated } = useAuth();
  const { cart, fetchCart, updateQuantity, removeFromCart, loading } = useCart();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (isAuthenticated) fetchCart();
  }, [isAuthenticated, fetchCart]);

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;
    setUpdating(productId);
    try {
      await updateQuantity(productId, newQty);
    } finally {
      setUpdating(null);
    }
  };

  const handleRemove = async (productId) => {
    setUpdating(productId);
    try {
      await removeFromCart(productId);
    } finally {
      setUpdating(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container page">
        <div className="empty-state">
          <p>Please log in to view your cart.</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  if (loading) return <div className="container page"><div className="loading">Loading cart...</div></div>;

  if (cart.items.length === 0) {
    return (
      <div className="container page">
        <h1 className="page-title">Your Cart</h1>
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1 className="page-title">Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.productId} className="cart-item">
              <img src={item.imageUrl} alt={item.productName} />
              <div className="cart-item-info">
                <Link to={`/products/${item.productId}`}>{item.productName}</Link>
                <p>${Number(item.unitPrice).toFixed(2)} each</p>
              </div>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  disabled={updating === item.productId || item.quantity <= 1}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  disabled={updating === item.productId}
                >
                  +
                </button>
              </div>
              <p className="cart-item-subtotal">${Number(item.subtotal).toFixed(2)}</p>
              <button
                type="button"
                className="btn-remove"
                onClick={() => handleRemove(item.productId)}
                disabled={updating === item.productId}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items ({cart.itemCount})</span>
            <span>${Number(cart.total).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${Number(cart.total).toFixed(2)}</span>
          </div>
          <button type="button" className="btn btn-primary btn-lg full-width" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
