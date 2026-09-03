import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./DestinationCard.css";

const badgeClass = { 
  Beach: "badge-beach",
  History: "badge-history",
  Nature: "badge-nature",
  Culture: "badge-culture",
};

export default function DestinationCard({ destination }) { // el destination hwa el object el gay mn el array
  const { isFavorite, toggleFavorite } = useFavorites(); // el isFavorite hwa function bt3rf lw el destination da mwgood fe el favorites aw la2
  const favorite = isFavorite(destination.id); // el favorite hwa boolean bt3rf lw el destination da mwgood fe el favorites aw la2

  return (
    <div className="destination-card">
      <div className="card-image">
        <img src={destination.image} alt={destination.name} />

        <span className={`badge ${badgeClass[destination.category] || ""}`}> // el badgeClass hwa object feh el categories w el classes bta3taha
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
          <Link to={`/destinations/${destination.id}`} className="details-btn"> // el link da bywsl el user l page el details bta3t el destination da 3la 7sb el id bta3o
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}