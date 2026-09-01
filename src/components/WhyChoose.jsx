import "./WhyChoose.css";

export default function WhyChoose(){
  const features = [
    { icon: "✨", title: "Curated Experiences", desc: "Handpicked experiences by travel experts" },
    { icon: "🛡", title: "Safe & Secure Booking", desc: "Book your trips with confidence" },
    { icon: "🧳", title: "Easy Planning", desc: "Build your perfect trip easily" },
    { icon: "⏰", title: "24/7 Support", desc: "We're here whenever you need us" }
  ];

  return (
    <section className="why-section">
      <div className="why-heading">
        <p className="why-kicker">Travel smarter, explore better</p>
        <h2>Why choose MasrGo</h2>
      </div>

      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-item" key={index}>
            <span className="why-icon">{item.icon}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}