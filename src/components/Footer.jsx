import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
                <div className="logo">
                  <img 
                  src="/images/logo.png"
                  alt="EgyTrail"
                  />
                </div>
          <p>Explore Egypt. Create unforgettable memories.</p>

          <div className="footer-contact">
            <p>info@egytrail.com</p>
            <p>+20 100 000 000</p>
            <p>Egypt</p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h3>Quick Links</h3>
            <a>Home</a>
            <a>Explore</a>
            <a>Trips</a>
          </div>

          <div>
            <h3>Explore</h3>
            <a>Dahab</a>
            <a>Luxor</a>
            <a>Siwa</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 EgyTrail. All rights reserved.</span>
        <div className="footer-legal">
          <a>Privacy</a>
          <a>Terms</a>
        </div>
      </div>
    </footer>
  );
}