import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  fetchAllProducts,
  fetchAllCategories,
  fetchCart,
  addToCartAPI,
  updateCartAPI,
  removeFromCartAPI,
  clearCartAPI,
  fetchWishlist,
  addToWishlistAPI,
  removeFromWishlistAPI,
  fetchAddresses,
  createAddressAPI,
  updateAddressAPI,
  deleteAddressAPI,
  fetchOrders,
  createOrderAPI,
} from '../api/api';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [wishlist, setWishlist] = useState({ products: [] });
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user] = useState({
    name: 'Shubham Mane',
    email: 'shubham@example.com',
    phone: '+91 98765 43210',
  });

  // Alert system
  const addAlert = useCallback((message, variant = 'success') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 3000);
  }, []);

  // ---- Fetch initial data ----
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData, cartData, wishlistData, addressData, ordersData] =
        await Promise.allSettled([
          fetchAllProducts(),
          fetchAllCategories(),
          fetchCart(),
          fetchWishlist(),
          fetchAddresses(),
          fetchOrders(),
        ]);
      if (productsData.status === 'fulfilled') setProducts(productsData.value); else console.error("Products error:", productsData.reason);
      if (categoriesData.status === 'fulfilled') setCategories(categoriesData.value); else console.error("Categories error:", categoriesData.reason);
      if (cartData.status === 'fulfilled') setCart(cartData.value); else console.error("Cart error:", cartData.reason);
      if (wishlistData.status === 'fulfilled') setWishlist(wishlistData.value); else console.error("Wishlist error:", wishlistData.reason);
      if (addressData.status === 'fulfilled') setAddresses(addressData.value); else console.error("Address error:", addressData.reason);
      if (ordersData.status === 'fulfilled') setOrders(ordersData.value); else console.error("Orders error:", ordersData.reason);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // ---- Cart actions ----
  const addToCart = async (productId) => {
    try {
      const updatedCart = await addToCartAPI(productId);
      setCart(updatedCart);
      addAlert('Item added to cart!');
    } catch {
      addAlert('Failed to add to cart', 'danger');
    }
  };

  const updateCartQuantity = async (productId, action) => {
    try {
      const updatedCart = await updateCartAPI(productId, action);
      setCart(updatedCart);
      addAlert(action === 'increment' ? 'Increased quantity' : 'Decreased quantity');
    } catch {
      addAlert('Failed to update cart', 'danger');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await removeFromCartAPI(productId);
      setCart(updatedCart);
      addAlert('Item removed from cart', 'warning');
    } catch {
      addAlert('Failed to remove from cart', 'danger');
    }
  };

  // ---- Wishlist actions ----
  const isInWishlist = (productId) => {
    return wishlist.products?.includes(productId);
  };

  const isInCart = (productId) => {
    return cart.items?.some(item => item.productId === productId);
  };

  const addToWishlist = async (productId) => {
    try {
      const updatedWishlist = await addToWishlistAPI(productId);
      setWishlist(updatedWishlist);
      addAlert('Item added to wishlist!');
    } catch {
      addAlert('Failed to add to wishlist', 'danger');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const updatedWishlist = await removeFromWishlistAPI(productId);
      setWishlist(updatedWishlist);
      addAlert('Item removed from wishlist', 'warning');
    } catch {
      addAlert('Failed to remove from wishlist', 'danger');
    }
  };

  const toggleWishlist = async (productId) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  // Move from wishlist to cart
  const moveToCart = async (productId) => {
    await removeFromWishlist(productId);
    await addToCart(productId);
  };

  // Move from cart to wishlist
  const moveToWishlist = async (productId) => {
    await removeFromCart(productId);
    await addToWishlist(productId);
  };

  // ---- Address actions ----
  const addAddress = async (data) => {
    try {
      const newAddress = await createAddressAPI(data);
      setAddresses(prev => [...prev, newAddress]);
      addAlert('Address added!');
    } catch {
      addAlert('Failed to add address', 'danger');
    }
  };

  const updateAddress = async (id, data) => {
    try {
      const updatedAddress = await updateAddressAPI(id, data);
      setAddresses(prev => prev.map(addr => addr._id === id ? updatedAddress : addr));
      addAlert('Address updated!');
    } catch {
      addAlert('Failed to update address', 'danger');
    }
  };

  const removeAddress = async (id) => {
    try {
      await deleteAddressAPI(id);
      setAddresses(prev => prev.filter(addr => addr._id !== id));
      addAlert('Address removed!');
    } catch {
      addAlert('Failed to remove address', 'danger');
    }
  };

  // ---- Order actions ----
  const placeOrder = async (orderData) => {
    try {
      const newOrder = await createOrderAPI(orderData);
      setOrders(prev => [...prev, newOrder]);
      // Clear the cart after placing order
      const clearedCart = await clearCartAPI();
      setCart(clearedCart);
      addAlert('Order Placed Successfully!');
      return true;
    } catch {
      addAlert('Failed to place order', 'danger');
      return false;
    }
  };

  // Helper: get product object by ID
  const getProductById = (productId) => {
    return products.find(p => p._id === productId);
  };

  return (
    <StoreContext.Provider
      value={{
        products, categories, cart, wishlist, addresses, orders, alerts, loading, user,
        addToCart, updateCartQuantity, removeFromCart,
        toggleWishlist, isInWishlist, isInCart,
        addToWishlist, removeFromWishlist, moveToCart, moveToWishlist,
        addAddress, updateAddress, removeAddress, placeOrder,
        getProductById, loadInitialData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
