import React from "react";
import "./StarRating.css";

const StarRating = ({ score, fontFamily = 'inherit', fontSize = 14 }) => {
  const stars = [];
  const value = parseFloat(score);
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else if (value >= i - 0.5) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star">★</span>);
    }
  }
  return (
    <div className="star-rating" style={{ fontFamily, fontSize }}>
      {stars} <span style={{ marginLeft: 4, color: '#222' }}>{score}/5</span>
    </div>
  );
};

export default StarRating; 