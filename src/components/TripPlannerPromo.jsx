import { Link } from "react-router-dom";
import "./TripPlannerPromo.css";

export default function TripPlannerPromo() {
  const steps = [
    { icon: "🗺", text: "Choose your destinations" },
    { icon: "📅", text: "Pick your dates & travel style" },
    { icon: "✨", text: "Get an instant, personalized itinerary" },
  ];

  return (
    <section className="trip-promo">
      <div className="trip-promo-text">
        <span className="trip-promo-badge">Plan Smarter</span>
        <h2>
          Build Your Perfect <span className="accent">Egypt Trip</span> in Minutes
        </h2>
        <p>
          Tell us where you want to go, for how long, and your style — our
          Trip Planner puts together a day-by-day itinerary instantly, so
          you spend less time planning and more time exploring.
        </p>

        <ul className="trip-promo-steps">
          {steps.map((step, i) => (
            <li key={i}>
              <span className="step-icon">{step.icon}</span>
              {step.text}
            </li>
          ))}
        </ul>

        <Link to="/trip-planner" className="trip-promo-btn">
          Plan My Trip →
        </Link>
      </div>

      <div className="trip-promo-visual">
        <img src="/images/luxor.jpg" alt="Trip planning preview" />
        <div className="trip-promo-card">
          <span className="dot"></span>
          3-Day Itinerary Ready
        </div>
      </div>
    </section>
  );
}