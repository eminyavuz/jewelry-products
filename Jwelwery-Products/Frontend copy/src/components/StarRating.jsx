import React from "react";

const StarRating = ({ score }) => {
  const fullStars = Math.floor(score);
  const halfStar = score - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
      {Array(fullStars).fill().map((_, i) => (
        <span key={"full-" + i} style={{ color: "#FFC107", fontSize: 18 }}>★</span>
      ))}
      {halfStar && <span style={{ color: "#FFC107", fontSize: 18 }}>☆</span>}
      {Array(emptyStars).fill().map((_, i) => (
        <span key={"empty-" + i} style={{ color: "#E0E0E0", fontSize: 18 }}>★</span>
      ))}
      <span style={{ marginLeft: 6, fontSize: 14, color: "#444" }}>{score}/5</span>
    </div>
  );
};

export default StarRating; 