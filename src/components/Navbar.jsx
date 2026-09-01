import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { bookings } = useBooking();

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/">MasrGo</NavLink>
      </div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/destinations">Explore</NavLink>
        <NavLink to="/trip-planner">Trip Planner</NavLink>

        <NavLink to="/my-bookings" className="bookings-link">
          My Bookings
          {bookings.length > 0 && (
            <span className="bookings-badge">{bookings.length}</span>
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
            <NavLink to="/login" className="login-btn">
              Login
            </NavLink>
            <NavLink to="/register" className="register-btn">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}