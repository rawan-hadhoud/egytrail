import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import DestinationCard from "../components/DestinationCard";
import "./Favorites.css";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <span className="page-badge">
          <span className="dot"></span> Saved by You <span className="dot"></span>
        </span>
        <h1>Your Favorites</h1>
        <p>All the places you've saved for your next trip.</p>
      </div>

      {favorites.length > 0 ? (
        <div className="destinations-grid">
          {favorites.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="favorites-empty">
          <span className="empty-icon">♡</span>
          <h2>No favorites yet</h2>
          <p>Tap the heart icon on any destination to save it here.</p>
          <Link to="/destinations" className="explore-btn">
            Explore Destinations →
          </Link>
        </div>
      )}
    </div>
  );
}