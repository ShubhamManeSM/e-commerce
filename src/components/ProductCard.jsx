import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const wishlisted = isInWishlist(product._id);
  const inCart = isInCart(product._id);

  const originalPrice = product.price ? Math.round(product.price * 2) : 0;
  const discountPercent = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;

  return (
    <Card className="h-100 border">
      {/* Image with wishlist heart */}
      <div className="product-img-container position-relative">
        <Link to={`/products/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <button
          className="wishlist-overlay-btn"
          onClick={() => toggleWishlist(product._id)}
        >
          <i className={`bi ${wishlisted ? 'bi-heart-fill' : 'bi-heart'}`} style={{ color: wishlisted ? '#dc3545' : '#666' }}></i>
        </button>
      </div>

      {/* Body */}
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="fs-6 fw-semibold mb-1">{product.name}</Card.Title>
        <div className="mb-1">
          <span className="fw-bold fs-5">₹{product.price}</span>
          <span className="text-muted text-decoration-line-through ms-2 small">₹{originalPrice}</span>
        </div>
        <p className="text-success fw-semibold small mb-3">{discountPercent}% off</p>

        <div className="mt-auto d-flex flex-column gap-2">
          {inCart ? (
            <Button variant="success" size="sm" className="fw-semibold" onClick={() => navigate('/cart')}>
              Go to Cart
            </Button>
          ) : (
            <Button variant="dark" size="sm" className="fw-semibold" onClick={() => addToCart(product._id)}>
              Add to Cart
            </Button>
          )}

          {wishlisted ? (
            <Button variant="outline-secondary" size="sm" onClick={() => toggleWishlist(product._id)}>
              Remove from Wishlist
            </Button>
          ) : (
            <Button variant="outline-secondary" size="sm" onClick={() => toggleWishlist(product._id)}>
              Save to Wishlist
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
