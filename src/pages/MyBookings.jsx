import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import "./MyBookings.css";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export default function MyBookings() {
  const { user } = useAuth();
  const { bookings, loading, removeBooking } = useBooking();

  if (!user) {
    return (
      <div className="my-bookings-page">
        <h1>My Bookings</h1>
        <div className="empty-bookings">
          <p>Log in to see and manage your bookings.</p>
          <Link to="/login" className="browse-btn">
            Login →
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="my-bookings-page">
        <h1>My Bookings</h1>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="my-bookings-page">
        <h1>My Bookings</h1>
        <div className="empty-bookings">
          <p>You don't have any bookings yet.</p>
          <Link to="/destinations" className="browse-btn">
            Browse Destinations →
          </Link>
        </div>
      </div>
    );
  }

  const grandTotal = bookings.reduce((sum, b) => sum + b.total, 0);

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>
      <p>
        {bookings.length} booking{bookings.length > 1 ? "s" : ""} • Total: $
        {grandTotal}
      </p>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div className="booking-card" key={booking.id}>
            <img src={booking.image} alt={booking.name} />

            <div className="booking-info">
              <h2>{booking.name}</h2>

              {booking.hotelName && (
                <p className="booking-hotel">
                  🏨 {booking.hotelName}
                  {booking.hotelStars ? ` (${"★".repeat(booking.hotelStars)})` : ""}
                </p>
              )}

              <p className="booking-dates">
                📅 {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
              </p>

              <p>
                ${booking.pricePerNight} / night × {booking.nights} night
                {booking.nights > 1 ? "s" : ""}
              </p>

              {booking.transport && (
                <p className="booking-transport">
                  🚌 {booking.transport.company} ({booking.transport.departure} →{" "}
                  {booking.transport.arrival}) — ${booking.transport.price}
                </p>
              )}

              <p className="booking-total">Total: ${booking.total}</p>
            </div>

            <button
              className="cancel-btn"
              onClick={() => removeBooking(booking.id)}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
