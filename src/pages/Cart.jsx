import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../context/StoreContext';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, moveToWishlist, getProductById } = useContext(StoreContext);
  const navigate = useNavigate();

  const cartItems = (cart.items || []).map(item => ({
    ...item,
    product: getProductById(item.productId),
  })).filter(item => item.product);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalOriginal = cartItems.reduce((sum, item) => sum + (item.product.price * 2 * item.quantity), 0);
  const totalDiscount = totalOriginal - totalPrice;

  return (
    <Container className="py-4">
      <h6 className="fw-bold text-center mb-4">MY CART ({cartItems.length})</h6>

      {cartItems.length === 0 ? (
        <div className="text-center py-5 bg-white border rounded">
          <p className="text-muted">Your cart is empty</p>
          <Button variant="dark" onClick={() => navigate('/products')}>Start Shopping</Button>
        </div>
      ) : (
        <Row>
          {/* Cart Items */}
          <Col lg={8}>
            {cartItems.map(item => {
              const originalPrice = item.product.price * 2;
              const discount = 50;
              return (
                <div key={item.productId} className="bg-white border rounded p-3 mb-3 d-flex gap-3">
                  {/* Image */}
                  <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: 150, minHeight: 150, flexShrink: 0 }}>
                    <img src={item.product.image} alt={item.product.name} style={{ maxWidth: '90%', maxHeight: 130, objectFit: 'contain' }} />
                  </div>

                  {/* Info */}
                  <div className="flex-grow-1">
                    <h6 className="fw-semibold mb-1">{item.product.name}</h6>
                    <div className="mb-1">
                      <span className="fw-bold fs-5">₹{item.product.price}</span>
                      <span className="text-muted text-decoration-line-through ms-2 small">₹{originalPrice}</span>
                    </div>
                    <p className="text-success fw-semibold small mb-2">{discount}% off</p>

                    {/* Quantity */}
                    <div className="d-flex align-items-center gap-1 mb-3">
                      <span className="fw-semibold small me-1">Quantity:</span>
                      <button className="btn btn-outline-secondary btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}
                        onClick={() => updateCartQuantity(item.productId, 'decrement')} disabled={item.quantity <= 1}>
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="qty-input">{item.quantity}</span>
                      <button className="btn btn-outline-secondary btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}
                        onClick={() => updateCartQuantity(item.productId, 'increment')}>
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="d-flex flex-column gap-2" style={{ maxWidth: 200 }}>
                      <Button variant="dark" size="sm" className="fw-semibold" onClick={() => removeFromCart(item.productId)}>
                        Remove From Cart
                      </Button>
                      <Button variant="outline-secondary" size="sm" onClick={() => moveToWishlist(item.productId)}>
                        Move to Wishlist
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>

          {/* Price Details */}
          <Col lg={4}>
            <div className="bg-white border rounded p-3" style={{ position: 'sticky', top: 80 }}>
              <h6 className="fw-bold text-uppercase mb-3">Price Details</h6>
              <div className="d-flex justify-content-between small mb-2">
                <span>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
                <span>₹{totalOriginal.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between small mb-2">
                <span>Discount</span>
                <span className="text-success">- ₹{totalDiscount.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between small mb-2">
                <span>Delivery Charges</span>
                <span>₹499</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-2">
                <span>TOTAL AMOUNT</span>
                <span>₹{(totalPrice + 499).toLocaleString()}</span>
              </div>
              <p className="text-success small mb-3">You will save ₹{totalDiscount.toLocaleString()} on this order</p>
              <Button variant="primary" className="w-100 fw-bold text-uppercase" onClick={() => navigate('/checkout')}>
                Place Order
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
