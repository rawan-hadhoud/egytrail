import { Link } from "react-router-dom";
import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-overlay">
        <h2>Ready to Explore Egypt?</h2>
        <p>Create unforgettable memories with our handpicked trips.</p>

        <Link to="/destinations" className="cta-btn">
          Explore Trips
        </Link>
      </div>
    </section>
  );
}