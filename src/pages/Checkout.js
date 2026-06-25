import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shippingAddress: '',
    city: '',
    zipCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await client.post('/orders', form);
      await fetchCart();
      navigate(`/orders/${data.id}`, { state: { orderPlaced: true } });
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container page">
        <div className="empty-state">
          <p>Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Address</h2>
          <div className="form-group">
            <label htmlFor="shippingAddress">Street Address</label>
            <input
              id="shippingAddress"
              name="shippingAddress"
              value={form.shippingAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input id="city" name="city" value={form.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input id="zipCode" name="zipCode" value={form.zipCode} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input id="country" name="country" value={form.country} onChange={handleChange} required />
          </div>

          {error && <p className="message error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Placing Order...' : `Place Order — $${Number(cart.total).toFixed(2)}`}
          </button>
        </form>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          {cart.items.map((item) => (
            <div key={item.productId} className="summary-item">
              <span>{item.productName} × {item.quantity}</span>
              <span>${Number(item.subtotal).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <span>${Number(cart.total).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
