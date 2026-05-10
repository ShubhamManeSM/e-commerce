import React, { useContext, useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const useQuery = () => new URLSearchParams(useLocation().search);

const ProductList = () => {
  const { products, categories } = useContext(StoreContext);
  const query = useQuery();
  const searchParam = query.get('search') || '';
  const categoryParam = query.get('category') || '';

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState('');
  const [priceRange, setPriceRange] = useState(5000);

  useEffect(() => {
    if (categoryParam) setSelectedCategories([categoryParam]);
  }, [categoryParam]);

  const handleCategoryChange = (name) => {
    setSelectedCategories(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinRating(0);
    setSortOrder('');
    setPriceRange(5000);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchParam) result = result.filter(p => p.name.toLowerCase().includes(searchParam.toLowerCase()));
    if (selectedCategories.length > 0) result = result.filter(p => selectedCategories.includes(p.category));
    if (minRating > 0) result = result.filter(p => (p.rating || 0) >= minRating);
    result = result.filter(p => p.price <= priceRange);
    if (sortOrder === 'low-to-high') result.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'high-to-low') result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, searchParam, selectedCategories, minRating, sortOrder, priceRange]);

  const categoryNames = categories.map(c => c.name).filter(name => ["Men", "Women", "Kids"].includes(name));

  return (
    <Container className="py-4">
      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} md={4} className="mb-4">
          <div className="bg-white border rounded p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Filters</h6>
              <a href="#" className="text-decoration-underline small" onClick={(e) => { e.preventDefault(); clearFilters(); }}>Clear</a>
            </div>

            {/* Price */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="fw-bold small mb-0">Price</p>
                <span className="badge bg-light text-dark border">Up to ₹{priceRange}</span>
              </div>
              <Form.Range min={500} max={5000} step={100} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
              <div className="d-flex justify-content-between text-muted px-1" style={{ fontSize: '0.75rem' }}>
                <span>₹500</span>
                <span>₹3000</span>
                <span>₹5000</span>
              </div>
            </div>

            {/* Category */}
            <div className="mb-3">
              <p className="fw-bold small mb-2">Category</p>
              {categoryNames.map(name => (
                <Form.Check
                  key={name}
                  type="checkbox"
                  id={`cat-${name}`}
                  label={name}
                  checked={selectedCategories.includes(name)}
                  onChange={() => handleCategoryChange(name)}
                  className="mb-1 small"
                />
              ))}
            </div>

            {/* Rating */}
            <div className="mb-3">
              <p className="fw-bold small mb-2">Rating</p>
              {[4, 3, 2, 1].map(r => (
                <Form.Check
                  key={r}
                  type="radio"
                  name="rating"
                  id={`rating-${r}`}
                  label={`${r} Stars & above`}
                  checked={minRating === r}
                  onChange={() => setMinRating(r)}
                  className="mb-1 small"
                />
              ))}
            </div>

            {/* Sort by */}
            <div className="mb-2">
              <p className="fw-bold small mb-2">Sort by</p>
              <Form.Check
                type="radio"
                name="sort"
                id="sort-low"
                label="Price – Low to High"
                checked={sortOrder === 'low-to-high'}
                onChange={() => setSortOrder('low-to-high')}
                className="mb-1 small"
              />
              <Form.Check
                type="radio"
                name="sort"
                id="sort-high"
                label="Price – High to Low"
                checked={sortOrder === 'high-to-low'}
                onChange={() => setSortOrder('high-to-low')}
                className="small"
              />
            </div>
          </div>
        </Col>

        {/* Product Grid */}
        <Col lg={9} md={8}>
          <div className="d-flex align-items-baseline mb-3">
            <h6 className="fw-bold mb-0">
              {searchParam ? `Results for "${searchParam}"` : 'Showing All Products'}
            </h6>
            <span className="text-muted small ms-2">( Showing {filteredProducts.length} products )</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-5 bg-white border rounded">
              <p className="text-muted mb-0">No products found.</p>
            </div>
          ) : (
            <Row className="g-3">
              {filteredProducts.map(product => (
                <Col key={product._id} lg={3} md={4} sm={6} xs={6}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
