import "./WhyChoose.css";

export default function WhyChoose() {
  const features = [
    {
      icon: "✨",
      color: "orange",
      title: "Curated Experiences",
      desc: "Handpicked experiences by travel experts who know Egypt intimately — from hidden coastal coves to secret desert temples.",
    },
    {
      icon: "🛡",
      color: "green",
      title: "Safe & Secure Booking",
      desc: "Book your trips with confidence. Every transaction is protected and every partner is vetted for quality and safety.",
    },
    {
      icon: "🗺",
      color: "blue",
      title: "Easy Planning",
      desc: "Build your perfect Egypt trip in minutes — mix destinations, set dates, and get a complete itinerary instantly.",
    },
    {
      icon: "💬",
      color: "purple",
      title: "24/7 Support",
      desc: "Whether you're planning from home or exploring the desert, we're here whenever you need us — day or night.",
    },
  ];

  return (
    <section className="why-section">
      <span className="why-badge">Our Promise</span>
      <h2>Why choose EgyTrail</h2>
      <p className="why-subtitle">Travel smarter, explore better.</p>

      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-card" key={index}>
            <div className={`why-icon icon-${item.color}`}>
              <span>{item.icon}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}