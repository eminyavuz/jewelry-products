import React from "react";

const COLOR_MAP = {
  yellow: { label: "Yellow Gold", color: "#E6CA97" },
  white: { label: "White Gold", color: "#D9D9D9" },
  rose:  { label: "Rose Gold",  color: "#E1A4A9" }
};

const ColorSelector = ({ colors, selectedColor, onSelect }) => (
  <div style={{ display: "flex", gap: "8px", justifyContent: "center", margin: "8px 0" }}>
    {colors.map((color) => (
      <button
        key={color}
        onClick={() => onSelect(color)}
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: selectedColor === color ? "2px solid #222" : "1px solid #ccc",
          background: COLOR_MAP[color]?.color || "#fff",
          cursor: "pointer",
          outline: "none"
        }}
        title={COLOR_MAP[color]?.label}
      />
    ))}
  </div>
);

export default ColorSelector; 