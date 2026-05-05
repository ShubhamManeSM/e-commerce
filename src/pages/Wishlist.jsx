import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../context/StoreContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart, getProductById, isInCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const wishlistProductIds = wishlist.products || [];
  const wishlistProducts = wishlistProductIds.map(id => getProductById(id)).filter(Boolean);

  return (
    <Container className="py-4">
      <h6 className="fw-bold mb-4">My Wishlist ({wishlistProducts.length})</h6>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-5 bg-white border rounded">
          <i className="bi bi-heart text-muted" style={{ fontSize: '3rem' }}></i>
          <p className="text-muted">Your wishlist is empty</p>
          <Button variant="dark" onClick={() => navigate('/products')}>Explore Products</Button>
        </div>
      ) : (
        <Row className="g-3">
          {wishlistProducts.map(product => {
            const originalPrice = product.price * 2;
            const discountPercent = 50;
            const inCart = isInCart(product._id);

            return (
              <Col key={product._id} lg={3} md={4} sm={6}>
                <Card className="h-100 border">
                  <div className="product-img-container">
                    <img src={product.image} alt={product.name} />
                  </div>
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
                        <Button variant="dark" size="sm" className="fw-semibold" onClick={() => moveToCart(product._id)}>
                          Move to Cart
                        </Button>
                      )}
                      <Button variant="outline-secondary" size="sm" onClick={() => removeFromWishlist(product._id)}>
                        Remove from Wishlist
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default Wishlist;
