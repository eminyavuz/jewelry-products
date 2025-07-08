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
  // Filtreler
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minPopularity, setMinPopularity] = useState(0);
  const [maxPopularity, setMaxPopularity] = useState(5);

  useEffect(() => {
    setLoading(true);
    const params = [];
    if (minPrice) params.push(`minPrice=${minPrice}`);
    if (maxPrice < 10000) params.push(`maxPrice=${maxPrice}`);
    if (minPopularity) params.push(`minPopularity=${minPopularity}`);
    if (maxPopularity < 5) params.push(`maxPopularity=${maxPopularity}`);
    const query = params.length ? `?${params.join("&")}` : "";
    fetch(`/api/products${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        // Her ürüne default selectedColor ekle
        setProducts(data.map((p) => ({ ...p, selectedColor: 0 })));
        setStartIdx(0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [minPrice, maxPrice, minPopularity, maxPopularity]);

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
      {/* Filtre UI */}
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 24, flexWrap: "wrap" }}>
        <div>
          <label>Min Price: </label>
          <input type="number" value={minPrice} min={0} max={maxPrice} onChange={e => setMinPrice(Number(e.target.value))} style={{ width: 80 }} />
        </div>
        <div>
          <label>Max Price: </label>
          <input type="number" value={maxPrice} min={minPrice} max={10000} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: 80 }} />
        </div>
        <div>
          <label>Min Popularity: </label>
          <input type="number" value={minPopularity} min={0} max={maxPopularity} step={0.1} onChange={e => setMinPopularity(Number(e.target.value))} style={{ width: 60 }} />
        </div>
        <div>
          <label>Max Popularity: </label>
          <input type="number" value={maxPopularity} min={minPopularity} max={5} step={0.1} onChange={e => setMaxPopularity(Number(e.target.value))} style={{ width: 60 }} />
        </div>
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