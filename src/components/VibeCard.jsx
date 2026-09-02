import "./VibeCard.css";

export default function VibeCard({ destination }) {
  return (
    <div className="vibe-card">
      <img src={destination.image} alt={destination.name} />

      <div className="vibe-overlay">
        <span className="vibe-line"></span>
        <h3>{destination.name}</h3>
        <p>{destination.governorate} · {destination.category}</p>
      </div>
    </div>
  );
}