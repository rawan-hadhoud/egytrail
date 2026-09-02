import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";
import { getHotelsByDestination } from "../data/hotels";
import { getBusByDestination } from "../data/buses";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import "./DestinationDetails.css";
import PageAnimation from "../components/PageAnimation";

function addDays(dateStr, days) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBooking();

  const destination = destinations.find((item) => item.id === Number(id));
  const hotels = destination ? getHotelsByDestination(destination.id) : [];
  const bus = destination ? getBusByDestination(destination.id) : null;

  const [checkIn, setCheckIn] = useState(todayStr());
  const [nights, setNights] = useState(1);
  const [hotelId, setHotelId] = useState(hotels[0]?.id || null);
  const [wantsBus, setWantsBus] = useState(false);
  const [booked, setBooked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!destination) {
    return (
      <div className="not-found">
        <h2>Destination Not Found</h2>
        <Link to="/destinations">Back to Destinations</Link>
      </div>
    );
  }

  const selectedHotel = hotels.find((h) => h.id === Number(hotelId)) || hotels[0];
  const checkOut = addDays(checkIn, nights);
  const hotelTotal = (selectedHotel?.pricePerNight || 0) * nights;
  const busTotal = wantsBus && bus ? bus.price : 0;
  const totalPrice = hotelTotal + busTotal;

  const resetBookedFlag = () => setBooked(false);

  const handleBook = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/destinations/${destination.id}`, viewtransition: true } });
      return;
    }

    setSubmitting(true);

    const result = await addBooking({
      destinationId: destination.id,
      name: destination.name,
      image: destination.image,
      checkIn,
      checkOut,
      nights,
      hotelId: selectedHotel?.id || null,
      hotelName: selectedHotel?.name || null,
      hotelStars: selectedHotel?.stars || null,
      pricePerNight: selectedHotel?.pricePerNight || 0,
      transport:
        wantsBus && bus
          ? { company: bus.company, departure: bus.departure, arrival: bus.arrival, price: bus.price }
          : null,
      total: totalPrice
    });

    setSubmitting(false);

    if (result.success) {
      setBooked(true);
    } else {
      alert("Something went wrong while booking, please try again.");
    }
  };

  return (
    <PageAnimation>

    <div className="details-page">
      {/* HERO */}
      <section className="details-hero">
        <img
          src={destination.image}
          className="details-image"
          alt={destination.name}
        />

        <div className="details-overlay">
          <h1>{destination.name}</h1>
          <p>{destination.governorate}</p>

          <div className="info">
            <span>⭐ {destination.rating}</span>
            <span>📍 {destination.governorate}</span>
            <span>{destination.category}</span>
          </div>
        </div>
      </section>

      {/* INFORMATION */}
      <section className="details-info">
        <h2>About {destination.name}</h2>
        <p>{destination.description}</p>

        {/* TAGS */}
        <h2>Experience</h2>
        <div className="activities">
          {destination.tags.map((tag, index) => (
            <div className="activity" key={index}>
              {tag}
            </div>
          ))}
        </div>

        {/* BOOKING */}
        <div className="booking-box">
          <h2>Book Your Stay</h2>

          <div className="booking-fields">
            <div className="field">
              <label htmlFor="checkin">Check-in date</label>
              <input
                id="checkin"
                type="date"
                min={todayStr()}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  resetBookedFlag();
                }}
              />
            </div>

            <div className="field">
              <label htmlFor="nights">Number of nights</label>
              <input
                id="nights"
                type="number"
                min="1"
                value={nights}
                onChange={(e) => {
                  setNights(Math.max(1, Number(e.target.value) || 1));
                  resetBookedFlag();
                }}
              />
            </div>
          </div>

          {/* HOTEL PICKER */}
          {hotels.length > 0 && (
            <div className="field full-width">
              <label htmlFor="hotel">Choose your hotel</label>
              <select
                id="hotel"
                value={hotelId || ""}
                onChange={(e) => {
                  setHotelId(Number(e.target.value));
                  resetBookedFlag();
                }}
              >
                {hotels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} — {"★".repeat(h.stars)} — ${h.pricePerNight}/night
                  </option>
                ))}
              </select>
              {selectedHotel && (
                <p className="hotel-amenities">
                  {selectedHotel.amenities.join(" • ")}
                </p>
              )}
            </div>
          )}

          {/* BUS / TRANSPORT PICKER */}
          {bus && (
            <div className="field full-width">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={wantsBus}
                  onChange={(e) => {
                    setWantsBus(e.target.checked);
                    resetBookedFlag();
                  }}
                />
                Add bus transport from Cairo — {bus.company} ({bus.departure} →{" "}
                {bus.arrival}) — ${bus.price}
              </label>
            </div>
          )}

          <p className="stay-dates">
            📅 {formatDate(checkIn)} → {formatDate(checkOut)}
          </p>

          <div className="price-breakdown">
            <p>
              🏨 {selectedHotel?.name}: ${selectedHotel?.pricePerNight} ×{" "}
              {nights} night{nights > 1 ? "s" : ""} = ${hotelTotal}
            </p>
            {wantsBus && bus && <p>🚌 Bus transport: ${busTotal}</p>}
            <p className="total-price">
              Total: <strong>${totalPrice}</strong>
            </p>
          </div>

          {!user && (
            <p className="login-hint">
              You need to{" "}
              <Link to="/login" state={{ from: `/destinations/${destination.id}`, viewtransition: true }}>
                log in
              </Link>{" "}
              to book this trip.
            </p>
          )}

          <div className="details-actions">
            <button
              className="book-btn"
              onClick={handleBook}
              disabled={submitting || booked}
            >
              {submitting ? "Booking..." : booked ? "Booked ✓" : "Book Now"}
            </button>

            <Link to="/trip-planner" className="plan-btn" viewtransition>
              Plan Your Trip →
            </Link>
          </div>

          {booked && (
            <p className="booking-confirmation">
              ✅ Booked {selectedHotel?.name} in {destination.name} from{" "}
              {formatDate(checkIn)} to {formatDate(checkOut)}
              {wantsBus && bus ? " + bus transport" : ""} — ${totalPrice}
            </p>
          )}
        </div>
      </section>
    </div>
    </PageAnimation>
  );
}
