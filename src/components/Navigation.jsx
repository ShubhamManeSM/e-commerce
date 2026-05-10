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
    <Navbar bg="white" expand="lg" sticky="top" className="border-bottom shadow-sm py-2">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-dark me-auto d-flex align-items-center gap-2">
          <i className="bi bi-hexagon-fill text-primary"></i> TrendHive
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none px-0" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Search Bar - Full width on mobile, centered on desktop */}
          <Form className="d-flex w-100 my-3 my-lg-0 mx-lg-4" style={{ maxWidth: 500 }} onSubmit={handleSearch}>
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

          {/* Right Side Icons & Profile */}
          <Nav className="d-flex flex-row align-items-center gap-4 gap-lg-3 ms-auto mt-2 mt-lg-0">
            <Button variant="dark" size="sm" className="fw-semibold px-3 rounded-1 d-none d-lg-block" onClick={() => navigate('/profile')}>
              Profile
            </Button>
            <Nav.Link as={Link} to="/profile" className="d-lg-none position-relative p-0 text-dark d-flex align-items-center gap-1">
              <i className="bi bi-person" style={{ fontSize: '1.25rem' }}></i>
              <span className="small fw-medium">Profile</span>
            </Nav.Link>
            
            <Nav.Link as={Link} to="/wishlist" className="position-relative p-0 text-dark d-flex align-items-center gap-1">
              <i className="bi bi-heart" style={{ fontSize: '1.25rem' }}></i>
              <span className="small fw-medium pe-1 d-lg-none d-xl-inline">Wishlist</span>
              {wishlistCount > 0 && (
                <Badge pill bg="danger" className="position-absolute" style={{ top: -8, left: 10, fontSize: '0.6rem' }}>
                  {wishlistCount}
                </Badge>
              )}
            </Nav.Link>
            
            <Nav.Link as={Link} to="/cart" className="position-relative p-0 text-dark d-flex align-items-center gap-1">
              <i className="bi bi-cart3" style={{ fontSize: '1.25rem' }}></i>
              <span className="small fw-medium pe-1 d-lg-none d-xl-inline">Cart</span>
              {cartCount > 0 && (
                <Badge pill bg="danger" className="position-absolute" style={{ top: -8, left: 10, fontSize: '0.6rem' }}>
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
