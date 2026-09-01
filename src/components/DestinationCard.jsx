import { useState } from "react";
import { Link } from "react-router-dom";
import "./DestinationCard.css";

export default function DestinationCard({ destination }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="destination-card">
      <div className="card-image">
        <img src={destination.image} alt={destination.name} />

        <div className="rating-badge">
          ⭐ {destination.rating}
        </div>

        <button
          className={`favorite ${favorite ? "is-active" : ""}`}
          aria-label="Add to favorites"
          onClick={(e) => {
            e.preventDefault();
            setFavorite((prev) => !prev);
          }}
        >
          {favorite ? "❤" : "♡"}
        </button>
      </div>

      <div className="card-content">
        <span className="location">📍 {destination.governorate}</span>

        <h2>{destination.name}</h2>

        <div className="card-info">
          <span>{destination.category}</span>
          <span className="price-tag">${destination.price} / night</span>
        </div>

        <Link to={`/destinations/${destination.id}`} className="details-btn">
          View Details →
        </Link>
      </div>
    </div>
  );
}
