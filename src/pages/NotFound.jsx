import { Link } from "react-router-dom";
import PageAnimation from "../components/PageAnimation";
import "./NotFound.css";

export default function NotFound() {
  return (
    <PageAnimation>
      <div className="not-found-page">
        <span className="not-found-code">404</span>
        <h1>Lost in the Desert</h1>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="not-found-btn">
          Back to Home →
        </Link>
      </div>
    </PageAnimation>
  );
}