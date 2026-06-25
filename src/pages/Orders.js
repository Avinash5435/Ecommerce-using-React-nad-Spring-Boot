import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get('/orders')
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container page"><div className="loading">Loading orders...</div></div>;

  if (orders.length === 0) {
    return (
      <div className="container page">
        <h1 className="page-title">My Orders</h1>
        <div className="empty-state">
          <p>You haven&apos;t placed any orders yet.</p>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1 className="page-title">My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <Link key={order.id} to={`/orders/${order.id}`} className="order-card">
            <div className="order-card-header">
              <span className="order-id">Order #{order.id}</span>
              <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span>
            </div>
            <div className="order-card-body">
              <p>{new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item(s)</p>
              <p className="order-total">${Number(order.totalAmount).toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Orders;
