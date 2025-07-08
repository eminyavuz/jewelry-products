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
      padding: "28px",
      width: "270px",
      background: "#fafafa",
      textAlign: "center"
    }}>
      <img
        src={product.images[selectedColor]}
        alt={product.name}
        style={{ width: "100%", borderRadius: "12px" }}
      />
      <div style={{ marginTop: "16px", fontWeight: 500, fontFamily: 'Montserrat-Medium', fontSize: 15 }}>{product.name}</div>
      <div style={{
        margin: "12px 0 12px 0",
        fontSize: 15,
        fontWeight: 400,
        color: "#222",
        letterSpacing: "0.5px",
        fontFamily: 'Montserrat-Regular'
      }}>
        {product.calculatedPrice ?
          `$${product.calculatedPrice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })} USD`
          : "Calculating..."}
      </div>
      <ColorSelector
        colors={Object.keys(product.images)}
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
      />
      <div style={{ fontSize: 12, color: "#888", fontFamily: 'Avenir-Book' }}>
        {COLOR_MAP[selectedColor]}
      </div>
      <StarRating score={(product.popularityScore * 5).toFixed(1)} fontFamily="Avenir-Book" fontSize={14} />
      <div>Weight: {product.weight}g</div>
    </div>
  );
};

export default ProductCard; 