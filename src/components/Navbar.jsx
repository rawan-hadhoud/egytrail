import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { useFavorites } from "../context/FavoritesContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { bookings } = useBooking(); 
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <div className="logo">

<img 
src="/images/logo.png"
alt="EgyTrail"
/>

</div>

      <div className="nav-links">
        <NavLink to="/" end viewtransition>
          Home
        </NavLink>
        <NavLink to="/destinations" viewtransition>
          Explore
        </NavLink>
        <NavLink to="/trip-planner" viewtransition>
          Trip Planner
        </NavLink>
        <NavLink to="/my-bookings" className="bookings-link" viewtransition>
          My Bookings
          {bookings.length > 0 && ( 
            <span className="bookings-badge">{bookings.length}</span>
          )}
        </NavLink>
      </div>

      <div className="nav-actions">
        <NavLink to="/favorites" className="favorites-link" aria-label="Favorites">
          ♡
          {favorites.length > 0 && (  
            <span className="favorites-badge">{favorites.length}</span>
          )}
        </NavLink>

        {user ? (
          <>
            <span className="user-name">Hi, {user.name} 👋</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="login-btn">Login</NavLink>
            <NavLink to="/register" className="register-btn">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}