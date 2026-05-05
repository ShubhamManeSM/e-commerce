import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Badge } from 'react-bootstrap';

import { StoreContext } from '../context/StoreContext';

const Profile = () => {
  const { user, addresses, orders, addAddress } = useContext(StoreContext);
  const [showForm, setShowForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: '', phone: '', city: '', state: '', pincode: '', addressLine: '' });

  const handleAdd = async (e) => {
    e.preventDefault();
    await addAddress(newAddr);
    setNewAddr({ name: '', phone: '', city: '', state: '', pincode: '', addressLine: '' });
    setShowForm(false);
  };

  return (
    <Container className="py-4">
      <Row className="g-4">
        {/* Profile Card */}
        <Col lg={4}>
          <Card className="border text-center">
            <Card.Body className="py-5">
              <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 80, height: 80 }}>
                <i className="bi bi-person-fill text-primary" style={{ fontSize: '2.2rem' }}></i>
              </div>
              <h5 className="fw-bold">{user.name}</h5>
              <p className="text-muted small mb-1">{user.email}</p>
              <p className="text-muted small">{user.phone}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {/* Addresses */}
          <Card className="border mb-4">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
              <h6 className="fw-bold mb-0"><i className="bi bi-geo-alt me-1"></i> Saved Addresses</h6>
              <Button variant="dark" size="sm" onClick={() => setShowForm(!showForm)}>
                <i className="bi bi-plus"></i> Add New
              </Button>
            </Card.Header>
            <Card.Body>
              {showForm && (
                <Form onSubmit={handleAdd} className="bg-light p-3 rounded mb-3">
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
                  <Button variant="dark" size="sm" type="submit">Save</Button>
                </Form>
              )}

              {addresses.length === 0 ? (
                <p className="text-muted text-center py-3">No saved addresses.</p>
              ) : (
                <Row className="g-3">
                  {addresses.map(addr => (
                    <Col md={6} key={addr._id}>
                      <div className="p-3 border rounded">
                        <strong className="small">{addr.name}</strong> — <span className="small">{addr.phone}</span><br />
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>

          {/* Order History */}
          <Card className="border">
            <Card.Header className="bg-white py-3">
              <h6 className="fw-bold mb-0"><i className="bi bi-box-seam me-1"></i> Order History</h6>
            </Card.Header>
            <Card.Body>
              {orders.length === 0 ? (
                <p className="text-muted text-center py-3">No orders yet.</p>
              ) : (
                orders.map(order => (
                  <div key={order._id} className="border rounded p-3 mb-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold small">Order #{order._id?.slice(-6)}</span>
                      <span className="fw-bold text-primary small">₹{order.totalAmount?.toLocaleString()}</span>
                    </div>
                    <p className="text-muted mb-1" style={{ fontSize: '0.8rem' }}>
                      Status: <Badge bg="success">{order.status}</Badge>
                    </p>
                    <div className="d-flex flex-wrap gap-1">
                      {order.items?.map((item, i) => (
                        <span key={i} className="badge bg-light text-dark border" style={{ fontSize: '0.7rem' }}>
                          {item.name} x{item.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
