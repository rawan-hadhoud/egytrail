import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";

import VibeCard from "../components/VibeCard";
import DestinationCard from "../components/DestinationCard";
import TripPlannerPromo from "../components/TripPlannerPromo";
import WhyChoose from "../components/WhyChoose";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import PageAnimation from "../components/PageAnimation";

export function Home() {

const navigate = useNavigate();

const [search,setSearch] = useState("");
const [error,setError] = useState("");

const handleSearch = () => {


const result = destinations.find((item)=>

item.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);



if(result){

setError("");

navigate(`/destinations/${result.id}`);

}

else{

setError("No destination found");

}


};
   return (
        <PageAnimation>

    <div className="home">

      <section className="hero">
        <span className="hero-badge">
          <span className="dot"></span> Powered by Local Expertise <span className="dot"></span>
        </span>

        <div className="hero-content">
          <h1>
            Discover <span className="accent">Egypt</span>
          </h1>

          <p>
            Your Next Adventure Starts Here. <br />
            Explore hidden places, ancient history, and unforgettable experiences.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
           {
error && 
<p className="search-error">
{error}
</p>
}
        </div>
      </section>

      <section className="quick-picks">
        <div className="quick-picks-grid">
          {destinations.slice(0, 3).map((destination) => (
            <VibeCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-item">
          <h2>10+</h2>
          <p>Destinations</p>
        </div>
        <div className="stat-item">
          <h2>50+</h2>
          <p>Experiences</p>
        </div>
        <div className="stat-item">
          <h2>20+</h2>
          <p>Adventure Trips</p>
        </div>
      </section>

      <section className="popular-section">
        <div className="popular-header">
          <h2>Popular Destinations</h2>
          <a className="view-all" href="/destinations">View All →</a>
        </div>

        <div className="destinations-grid">
          {destinations.filter((d) => d.featured).map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      <TripPlannerPromo />

      <WhyChoose />

      <CTA />

      <Footer />

    </div>
        </PageAnimation>

  );
}