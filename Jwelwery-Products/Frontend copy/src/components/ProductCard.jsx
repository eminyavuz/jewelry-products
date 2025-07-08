import React, { useState } from "react";
import ColorSelector from "./ColorSelector";
import StarRating from "./StarRating";
import "./ProductCard.css";

const COLOR_MAP = {
  yellow: "Yellow Gold",
  white: "White Gold",
  rose: "Rose Gold"
};

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState("yellow");

  return (
    <div className="product-card" style={{
      border: "1px solid #eee",
      borderRadius: "16px",
      padding: "16px",
      width: "220px",
      background: "#fafafa",
      textAlign: "center"
    }}>
      <img
        src={product.images[selectedColor]}
        alt={product.name}
        style={{ width: "100%", borderRadius: "12px" }}
      />
      <div style={{ marginTop: "12px", fontWeight: "bold" }}>{product.name}</div>
      <ColorSelector
        colors={Object.keys(product.images)}
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
      />
      <div style={{ fontSize: 12, color: "#888" }}>
        {COLOR_MAP[selectedColor]}
      </div>
      <StarRating score={(product.popularityScore * 5).toFixed(1)} />
      <div>Weight: {product.weight}g</div>
    </div>
  );
};

export default ProductCard; 