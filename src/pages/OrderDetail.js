import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import client from '../api/client';

function OrderDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get(`/orders/${id}`)
      .then(({ data }) => setOrder(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container page"><div className="loading">Loading order...</div></div>;
  if (!order) return <div className="container page"><div className="empty-state">Order not found.</div></div>;

  return (
    <div className="container page">
      {location.state?.orderPlaced && (
        <div className="success-banner">
          Order placed successfully! Thank you for shopping with ShopHub.
        </div>
      )}

      <div className="order-detail-header">
        <div>
          <h1 className="page-title">Order #{order.id}</h1>
          <p className="order-date">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span>
      </div>

      <div className="order-detail-layout">
        <div className="order-items-section">
          <h2>Items</h2>
          {order.items.map((item) => (
            <div key={item.productId} className="order-item-row">
              <div>
                <Link to={`/products/${item.productId}`}>{item.productName}</Link>
                <p>Qty: {item.quantity} × ${Number(item.unitPrice).toFixed(2)}</p>
              </div>
              <span>${(Number(item.unitPrice) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <span>${Number(order.totalAmount).toFixed(2)}</span>
          </div>
        </div>

        <div className="shipping-section">
          <h2>Shipping Address</h2>
          <p>{order.shippingAddress}</p>
          <p>{order.city}, {order.zipCode}</p>
          <p>{order.country}</p>
        </div>
      </div>

      <Link to="/orders" className="link-more">← Back to orders</Link>
    </div>
  );
}

export default OrderDetail;
