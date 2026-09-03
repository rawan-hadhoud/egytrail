import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./DestinationCard.css";

const badgeClass = { 
  Beach: "badge-beach",
  History: "badge-history",
  Nature: "badge-nature",
  Culture: "badge-culture",
};

export default function DestinationCard({ destination }) { 
  const { isFavorite, toggleFavorite } = useFavorites(); 
  const favorite = isFavorite(destination.id); 

  return (
    <div className="destination-card">
      <div className="card-image">
        <img src={destination.image} alt={destination.name} />

        <span className={`badge ${badgeClass[destination.category] || ""}`}> 
          {destination.category}
        </span>

        <button
          className={`favorite ${favorite ? "is-active" : ""}`} 
          aria-label="Add to favorites" 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(destination);
          }}
        >
          {favorite ? "❤" : "♡"} 
        </button>
      </div>

      <div className="card-content">
        <div className="title-row">
          <h3>{destination.name}</h3>
          <span className="rating">
            <span className="star">★</span> {destination.rating}
          </span>
        </div>

        <p className="location">{destination.governorate}</p>

        <div className="info-row">
          <span className="price">
            <strong>${destination.price}</strong> / night 
          </span>
          <Link to={`/destinations/${destination.id}`} className="details-btn"> 
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}