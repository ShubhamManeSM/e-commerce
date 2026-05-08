import React, { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Home = () => {
  const { categories } = useContext(StoreContext);
  const navigate = useNavigate();

  // Placeholder images for categories
  const categoryImages = {
    "Men": "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&q=80",
    "Women": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80",
    "Kids": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&q=80",
  };

  return (
    <div className="bg-light">
      <Container className="py-4">
        {/* Category Strip - matching prototype */}
        <Row className="g-3 mb-4 justify-content-center">
          {categories.filter(cat => ["Men", "Women", "Kids"].includes(cat.name)).map((cat) => (
            <Col key={cat._id} xs="auto">
              <div
                className="text-center"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
              >
                <div
                  className="rounded overflow-hidden"
                  style={{ width: 150, height: 100 }}
                >
                  <img
                    src={categoryImages[cat.name] || `https://via.placeholder.com/150x100?text=${cat.name}`}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <p className="fw-semibold small mt-2 mb-0">{cat.name}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Hero Banner */}
        <div className="rounded mb-4 overflow-hidden" style={{ height: 400 }}>
          <img
            src="/hero-banner.jpeg"
            alt="Fashion Collection"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
          />
        </div>

        {/* Collection Cards - matching prototype */}
        <Row className="g-3 mb-4">
          <Col md={6}>
            <Card className="border">
              <Card.Body className="d-flex align-items-center gap-3 p-4" style={{ cursor: 'pointer' }} onClick={() => navigate('/products?search=summer')}>
                <div className="rounded overflow-hidden" style={{ width: 120, height: 120, flexShrink: 0 }}>
                  <img src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80" alt="Summer Collection" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div>
                  <p className="text-muted text-uppercase small fw-semibold mb-1" style={{ letterSpacing: 1, fontSize: '0.7rem' }}>NEW ARRIVALS</p>
                  <h5 className="fw-bold mb-2">Summer Collection</h5>
                  <p className="text-muted small mb-0">Check out our best summer collection to stay cool and stylish this season</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border">
              <Card.Body className="d-flex align-items-center gap-3 p-4" style={{ cursor: 'pointer' }} onClick={() => navigate('/products?search=winter')}>
                <div className="rounded overflow-hidden" style={{ width: 120, height: 120, flexShrink: 0 }}>
                  <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80" alt="Winter Collection" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div>
                  <p className="text-muted text-uppercase small fw-semibold mb-1" style={{ letterSpacing: 1, fontSize: '0.7rem' }}>NEW ARRIVALS</p>
                  <h5 className="fw-bold mb-2">Winter Collection</h5>
                  <p className="text-muted small mb-0">Check out our best winter collection to stay warm in style this season</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
