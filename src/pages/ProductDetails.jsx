import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

import { StoreContext } from '../context/StoreContext';
import { fetchProductById } from '../api/api';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, isInCart, products } = useContext(StoreContext);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-dark" />
        <p className="mt-3 text-muted">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h4>Product not found</h4>
        <Button variant="dark" className="mt-3" onClick={() => navigate('/products')}>Back to Products</Button>
      </Container>
    );
  }

  const wishlisted = isInWishlist(product._id);
  const inCart = isInCart(product._id);
  const originalPrice = Math.round(product.price * 2);
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const relatedProducts = products.filter(p => p.category === product.category && p._id !== product._id).slice(0, 4);

  return (
    <Container className="py-4">
      {/* Main Detail Card */}
      <div className="bg-white border rounded p-4 mb-4">
        <Row>
          {/* Product Image */}
          <Col md={5}>
            <div className="bg-light rounded d-flex align-items-center justify-content-center position-relative" style={{ minHeight: 380 }}>
              <img src={product.image} alt={product.name} className="img-fluid" style={{ maxHeight: 360, objectFit: 'contain' }} />
              <button
                className="wishlist-overlay-btn"
                onClick={() => toggleWishlist(product._id)}
              >
                <i className={`bi ${wishlisted ? 'bi-heart-fill' : 'bi-heart'}`} style={{ fontSize: '1.1rem', color: wishlisted ? '#dc3545' : '#666' }}></i>
              </button>
            </div>
          </Col>

          {/* Product Info */}
          <Col md={7} className="mt-3 mt-md-0">
            <h4 className="fw-bold">{product.name}</h4>

            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="fw-semibold">{product.rating}</span>
              <span className="text-warning">★★★★★</span>
            </div>

            <div className="mb-1">
              <span className="fw-bold fs-3">₹{product.price}</span>
              <span className="text-muted text-decoration-line-through ms-2">₹{originalPrice}</span>
              <span className="text-success fw-semibold ms-2">{discountPercent}% off</span>
            </div>

            {/* Size Selector */}
            {product.sizes?.length > 0 && (
              <div className="d-flex align-items-center gap-2 my-3">
                <span className="fw-semibold small">Size:</span>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex gap-2 my-3">
              {inCart ? (
                <Button variant="success" className="fw-semibold flex-fill" onClick={() => navigate('/cart')}>
                  Go to Cart
                </Button>
              ) : (
                <>
                  <Button variant="success" className="fw-semibold flex-fill" onClick={() => { addToCart(product._id); navigate('/cart'); }}>
                    Buy Now
                  </Button>
                  <Button variant="dark" className="fw-semibold flex-fill" onClick={() => addToCart(product._id)}>
                    Add to Cart
                  </Button>
                </>
              )}
            </div>

            {/* Delivery Features */}
            <div className="delivery-features border-top border-bottom py-3 my-3">
              <div className="delivery-feature">
                <i className="bi bi-arrow-counterclockwise" style={{ fontSize: '1.3rem' }}></i>
                <span>10 days<br/>Returnable</span>
              </div>
              <div className="delivery-feature">
                <i className="bi bi-cash-stack" style={{ fontSize: '1.3rem' }}></i>
                <span>Pay on<br/>Delivery</span>
              </div>
              <div className="delivery-feature">
                <i className="bi bi-truck" style={{ fontSize: '1.3rem' }}></i>
                <span>Free<br/>Delivery</span>
              </div>
              <div className="delivery-feature">
                <i className="bi bi-shield-check" style={{ fontSize: '1.3rem' }}></i>
                <span>Secure<br/>Payment</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h6 className="fw-bold">Description:</h6>
                <p className="text-muted small" style={{ lineHeight: 1.7 }}>{product.description}</p>
              </div>
            )}
          </Col>
        </Row>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h6 className="fw-bold mb-3">More items you may like in {product.category}</h6>
          <Row className="g-3">
            {relatedProducts.map(rp => (
              <Col key={rp._id} lg={3} md={4} sm={6}>
                <ProductCard product={rp} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ProductDetails;
