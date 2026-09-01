import { useState } from "react";
import { destinations } from "../data/destinations";
import DestinationCard from "../components/DestinationCard";
import "./Destinations.css";

const categories = ["All", "Beach", "History", "Nature", "Desert", "Culture"];
const categoryIcons = {
  Beach: "🏖 ",
  History: "🏛 ",
  Nature: "🌿 ",
  Desert: "🏜 ",
  Culture: "🏺 "
};

export default function Destinations() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const filteredDestinations = destinations
    .filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = category === "All" || item.category === category;

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="explore-page">
      <h1>Explore Egypt</h1>
      <p>Discover amazing places and unforgettable experiences</p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {categoryIcons[cat] || ""}
              {cat}
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="rating">⭐ Highest Rating</option>
          <option value="price-low">💰 Price Low</option>
          <option value="price-high">💰 Price High</option>
        </select>
      </div>

      <div className="destinations-grid">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))
        ) : (
          <h2 className="no-results">No destinations found 😔</h2>
        )}
      </div>
    </div>
  );
}
