import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSwipeable } from "react-swipeable";
import "./ProductList.css";

const COLOR_OPTIONS = [
  { key: "yellow", name: "Yellow Gold", code: "#E6CA97" },
  { key: "white", name: "White Gold", code: "#D9D9D9" },
  { key: "rose", name: "Rose Gold", code: "#E1A4A9" },
];

const VISIBLE_COUNT = 4;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIdx, setStartIdx] = useState(0);

  // Asıl filtreler (fetch için)
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    minPopularity: 0,
    maxPopularity: 5
  });
  // Inputlarda tutulan geçici filtreler
  const [pendingFilters, setPendingFilters] = useState(filters);

  // Input focus state'leri
  const [focus, setFocus] = useState({
    minPrice: false,
    maxPrice: false,
    minPopularity: false,
    maxPopularity: false
  });

  useEffect(() => {
    setLoading(true);
    const params = [];
    if (filters.minPrice) params.push(`minPrice=${filters.minPrice}`);
    if (filters.maxPrice < 50000) params.push(`maxPrice=${filters.maxPrice}`);
    if (filters.minPopularity) params.push(`minPopularity=${filters.minPopularity}`);
    if (filters.maxPopularity < 5) params.push(`maxPopularity=${filters.maxPopularity}`);
    const query = params.length ? `?${params.join("&")}` : "";
    fetch(`${process.env.REACT_APP_API_URL}/api/products${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setProducts(data.map((p) => ({ ...p, selectedColor: 0 })));
        setStartIdx(0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filters]);

  const maxIdx = Math.max(0, products.length - VISIBLE_COUNT);

  const handlePrev = () => setStartIdx((idx) => Math.max(0, idx - 1));
  const handleNext = () => setStartIdx((idx) => Math.min(maxIdx, idx + 1));

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true
  });

  if (loading) return <div className="product-list-container">Loading...</div>;
  if (error) return <div className="product-list-container">Error: {error}</div>;

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Product List</h2>
      {/* Modern, kart tarzı filtre UI */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-card">
            <label>Min Price (USD)</label>
            <input
              type="number"
              value={focus.minPrice && pendingFilters.minPrice === 0 ? '' : pendingFilters.minPrice || ''}
              placeholder="Min"
              min={0}
              max={pendingFilters.maxPrice}
              onFocus={() => setFocus(f => ({ ...f, minPrice: true }))}
              onBlur={() => setFocus(f => ({ ...f, minPrice: false }))}
              onChange={e => setPendingFilters(f => ({ ...f, minPrice: Number(e.target.value) }))}
            />
          </div>
          <div className="filter-card">
            <label>Max Price (USD)</label>
            <input
              type="number"
              value={focus.maxPrice && pendingFilters.maxPrice === 0 ? '' : pendingFilters.maxPrice || ''}
              placeholder="Max"
              min={pendingFilters.minPrice}
              max={100000}
              onFocus={() => setFocus(f => ({ ...f, maxPrice: true }))}
              onBlur={() => setFocus(f => ({ ...f, maxPrice: false }))}
              onChange={e => setPendingFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
            />
          </div>
          <div className="filter-card">
            <label>Min Popularity</label>
            <input
              type="number"
              value={focus.minPopularity && pendingFilters.minPopularity === 0 ? '' : pendingFilters.minPopularity || ''}
              placeholder="Min"
              min={0}
              max={pendingFilters.maxPopularity}
              step={0.1}
              onFocus={() => setFocus(f => ({ ...f, minPopularity: true }))}
              onBlur={() => setFocus(f => ({ ...f, minPopularity: false }))}
              onChange={e => setPendingFilters(f => ({ ...f, minPopularity: Number(e.target.value) }))}
            />
          </div>
          <div className="filter-card">
            <label>Max Popularity</label>
            <input
              type="number"
              value={focus.maxPopularity && pendingFilters.maxPopularity === 0 ? '' : pendingFilters.maxPopularity || ''}
              placeholder="Max"
              min={pendingFilters.minPopularity}
              max={5}
              step={0.1}
              onFocus={() => setFocus(f => ({ ...f, maxPopularity: true }))}
              onBlur={() => setFocus(f => ({ ...f, maxPopularity: false }))}
              onChange={e => setPendingFilters(f => ({ ...f, maxPopularity: Number(e.target.value) }))}
            />
          </div>
        </div>
        <button className="filter-button" onClick={() => setFilters(pendingFilters)}>Filtrele</button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <button onClick={handlePrev} disabled={startIdx === 0} style={{ fontSize: 24, background: "none", border: "none", cursor: "pointer" }}>&lt;</button>
        <div {...swipeHandlers} style={{ display: "flex", gap: "24px", overflow: "hidden", width: 960 }}>
          {loading ? <div>Loading...</div> : products.slice(startIdx, startIdx + VISIBLE_COUNT).map((product, idx) => (
            <ProductCard
              key={product.name}
              product={product}
              colorOptions={COLOR_OPTIONS}
              setProductColor={(colorIdx) => {
                setProducts((prev) => {
                  const copy = [...prev];
                  copy[startIdx + idx] = { ...copy[startIdx + idx], selectedColor: colorIdx };
                  return copy;
                });
              }}
            />
          ))}
        </div>
        <button onClick={handleNext} disabled={startIdx === maxIdx} style={{ fontSize: 24, background: "none", border: "none", cursor: "pointer" }}>&gt;</button>
      </div>
    </div>
  );
};

export default ProductList; 