import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../context/StoreContext';

const Checkout = () => {
  const { cart, addresses, placeOrder, getProductById, addAddress } = useContext(StoreContext);
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?._id || null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: '', phone: '', city: '', state: '', pincode: '', addressLine: '' });

  const cartItems = (cart.items || []).map(item => ({
    ...item,
    product: getProductById(item.productId),
  })).filter(item => item.product);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return alert('Please select a delivery address');
    const selectedAddress = addresses.find(a => a._id === selectedAddressId);
    const orderData = {
      items: cartItems.map(item => ({ productId: item.productId, name: item.product.name, quantity: item.quantity, price: item.product.price })),
      totalAmount: totalPrice + 499,
      address: selectedAddress,
    };
    const success = await placeOrder(orderData);
    if (success) setOrderPlaced(true);
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    await addAddress(newAddr);
    setNewAddr({ name: '', phone: '', city: '', state: '', pincode: '', addressLine: '' });
    setShowAddForm(false);
  };

  if (orderPlaced) {
    return (
      <Container className="py-5 text-center">
        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4.5rem' }}></i>
        <h4 className="fw-bold">Order Placed Successfully!</h4>
        <p className="text-muted">Thank you for shopping with TrendHive.</p>
        <Button variant="dark" className="mt-2" onClick={() => navigate('/products')}>Continue Shopping</Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h6 className="fw-bold mb-4">Checkout</h6>
      <Row>
        <Col lg={8}>
          <div className="bg-white border rounded p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Select Delivery Address</h6>
              <Button variant="dark" size="sm" onClick={() => setShowAddForm(!showAddForm)}>+ Add New</Button>
            </div>

            {showAddForm && (
              <Form onSubmit={handleAddAddress} className="bg-light p-3 rounded mb-3">
                <Row className="g-2 mb-2">
                  <Col sm={6}><Form.Control size="sm" placeholder="Full Name" value={newAddr.name} onChange={e => setNewAddr({...newAddr, name: e.target.value})} required /></Col>
                  <Col sm={6}><Form.Control size="sm" placeholder="Phone" value={newAddr.phone} onChange={e => setNewAddr({...newAddr, phone: e.target.value})} required /></Col>
                </Row>
                <Form.Control size="sm" className="mb-2" placeholder="Address Line" value={newAddr.addressLine} onChange={e => setNewAddr({...newAddr, addressLine: e.target.value})} required />
                <Row className="g-2 mb-2">
                  <Col sm={4}><Form.Control size="sm" placeholder="City" value={newAddr.city} onChange={e => setNewAddr({...newAddr, city: e.target.value})} required /></Col>
                  <Col sm={4}><Form.Control size="sm" placeholder="State" value={newAddr.state} onChange={e => setNewAddr({...newAddr, state: e.target.value})} required /></Col>
                  <Col sm={4}><Form.Control size="sm" placeholder="Pincode" value={newAddr.pincode} onChange={e => setNewAddr({...newAddr, pincode: e.target.value})} required /></Col>
                </Row>
                <Button variant="dark" size="sm" type="submit">Save Address</Button>
              </Form>
            )}

            {addresses.length === 0 ? (
              <p className="text-muted text-center py-3">No saved addresses. Add one above.</p>
            ) : (
              addresses.map(addr => (
                <div
                  key={addr._id}
                  className={`p-3 border rounded mb-2 ${selectedAddressId === addr._id ? 'border-primary bg-light' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedAddressId(addr._id)}
                >
                  <Form.Check
                    type="radio"
                    name="address"
                    id={`addr-${addr._id}`}
                    checked={selectedAddressId === addr._id}
                    onChange={() => setSelectedAddressId(addr._id)}
                    label={<><strong>{addr.name}</strong> — {addr.phone}<br /><span className="text-muted small">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</span></>}
                  />
                </div>
              ))
            )}
          </div>
        </Col>

        <Col lg={4}>
          <div className="bg-white border rounded p-3" style={{ position: 'sticky', top: 80 }}>
            <h6 className="fw-bold text-uppercase mb-3">Order Summary</h6>
            {cartItems.map(item => (
              <div key={item.productId} className="d-flex justify-content-between small mb-2">
                <span>{item.product.name} x{item.quantity}</span>
                <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="d-flex justify-content-between small mb-2">
              <span>Delivery</span><span>₹499</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total</span><span>₹{(totalPrice + 499).toLocaleString()}</span>
            </div>
            <Button variant="primary" className="w-100 fw-bold text-uppercase" onClick={handlePlaceOrder} disabled={!selectedAddressId}>
              Place Order
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
