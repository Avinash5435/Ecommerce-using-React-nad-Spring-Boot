import { createContext, useContext, useState, useCallback } from 'react';
import client from '../api/client';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }

    setLoading(true);
    try {
      const { data } = await client.get('/wishlist');
      setWishlist(data);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addToWishlist = async (productId) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required');
    }

    setLoading(true);
    try {
      const { data } = await client.post('/wishlist/items', { productId });
      setWishlist(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required');
    }

    setLoading(true);
    try {
      const { data } = await client.delete(`/wishlist/items/${productId}`);
      setWishlist(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, fetchWishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
