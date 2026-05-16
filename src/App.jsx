import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { StoreContext } from './context/StoreContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';

function App() {
  const { alerts, loading } = useContext(StoreContext);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />

      {/* Alert Toasts */}
      <div className="alert-stack">
        {alerts.map(alert => (
          <Alert key={alert.id} variant={alert.variant} className="py-2 px-3 mb-0 shadow-sm">
            {alert.message}
          </Alert>
        ))}
      </div>

      <main className="flex-grow-1">
        {loading ? (
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading products...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        )}
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-auto small">
        &copy; {new Date().getFullYear()} TrendHive. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
