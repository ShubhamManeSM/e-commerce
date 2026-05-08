import React, { useContext, useState } from 'react';
import { Navbar, Container, Form, Nav, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navigation = () => {
  const { cart, wishlist } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartCount = cart.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const wishlistCount = wishlist.products?.length || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Navbar bg="white" sticky="top" className="border-bottom shadow-sm py-2">
      <Container className="flex-wrap">
        <Navbar.Brand as={Link} to="/" className="fw-semibold fs-5 text-dark me-auto">
          e-commerce
        </Navbar.Brand>

        {/* Right Side Icons & Profile */}
        <Nav className="d-flex flex-row align-items-center gap-3 ms-auto order-lg-last">
          <Button variant="dark" size="sm" className="fw-semibold px-3 rounded-1" onClick={() => navigate('/profile')}>
            Profile
          </Button>
          <Nav.Link as={Link} to="/wishlist" className="position-relative p-0 text-dark d-flex align-items-center gap-1">
            <i className="bi bi-heart" style={{ fontSize: '1.25rem' }}></i>
            <span className="small fw-medium d-none d-sm-inline pe-1">Wishlist</span>
            {wishlistCount > 0 && (
              <Badge pill bg="danger" className="position-absolute" style={{ top: -8, right: -8, fontSize: '0.6rem' }}>
                {wishlistCount}
              </Badge>
            )}
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" className="position-relative p-0 text-dark d-flex align-items-center gap-1 ms-2">
            <i className="bi bi-cart3" style={{ fontSize: '1.25rem' }}></i>
            <span className="small fw-medium d-none d-sm-inline pe-1">Cart</span>
            {cartCount > 0 && (
              <Badge pill bg="danger" className="position-absolute" style={{ top: -8, right: -8, fontSize: '0.6rem' }}>
                {cartCount}
              </Badge>
            )}
          </Nav.Link>
        </Nav>

        {/* Search Bar - Full width on mobile, centered on desktop */}
        <Form className="d-flex w-100 mt-3 mt-lg-0 mx-lg-4" style={{ maxWidth: 500, flex: 1, order: 2 }} onSubmit={handleSearch}>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <Form.Control
              type="search"
              placeholder="Search products..."
              className="border-start-0 shadow-none"
              size="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Navigation;
