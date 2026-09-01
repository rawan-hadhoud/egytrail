import { useState } from "react";
import { destinations } from "../data/destinations";
import "./TripPlanner.css";

const activityPool = {
  Beach: ["Relax and swim at the beach", "Sunset boat ride", "Beachside dinner"],
  Diving: ["Guided diving session", "Explore coral reefs"],
  Snorkeling: ["Snorkeling trip to the reef", "Boat trip with snorkeling gear"],
  Adventure: ["Desert safari by jeep", "Quad biking adventure"],
  Desert: ["Camel ride at sunset", "Camping under the stars"],
  History: ["Guided tour of ancient temples", "Visit historical monuments"],
  Culture: ["Explore the local market", "Traditional food tasting"],
  Museums: ["Visit the main museum", "Guided history walk"],
  Nature: ["Nature walk", "Visit natural springs"],
  Relaxation: ["Spa and relaxation time", "Quiet oasis walk"],
  Resort: ["Pool day at the resort", "Beach club visit"],
  Nile: ["Felucca ride on the Nile", "Sunset Nile cruise"]
};

// Generic activities used whenever a typed destination isn't in our list,
// so the planner always produces a plan instead of failing.
const genericPool = [
  "Explore the city center and local neighborhoods",
  "Try popular local food spots",
  "Visit a well-known landmark or museum",
  "Relax at a café and people-watch",
  "Take a guided walking tour",
  "Shop at a local market or bazaar"
];
const styleBoost = {
  Adventure: ["Jeep safari through rugged terrain", "Adrenaline water sport session", "Off-road quad biking"],
  Relax: ["Slow morning by the water", "Spa or massage session", "Sunset lounge time"],
  History: ["Guided tour with a local historian", "Visit to a lesser-known ancient site", "Museum deep-dive"]
};

const budgetNotes = {
  Low: "on a budget-friendly local spot",
  Medium: "at a well-rated mid-range place",
  High: "at a premium, top-rated venue"
};

function findDestination(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  return (
    destinations.find((item) => item.name.toLowerCase() === q) ||
    destinations.find(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        q.includes(item.name.toLowerCase())
    ) ||
    destinations.find((item) => item.governorate.toLowerCase().includes(q)) ||
    null
  );
}

function buildItinerary(place, days, startDate, budget, style) {
  const numDays = Number(days) > 0 ? Number(days) : 3;

  const tagPool = place.tags
    ? place.tags.flatMap((tag) => activityPool[tag] || [])
    : [];
  const stylePool = styleBoost[style] || [];

  const combinedPool = [...stylePool, ...tagPool];
  const finalPool = combinedPool.length > 0 ? combinedPool : genericPool;

  const note = budgetNotes[budget] || "";
  const start = startDate ? new Date(startDate) : null;

  const itinerary = [];
  for (let i = 0; i < numDays; i++) {
    const activity = finalPool[i % finalPool.length];

    let dateLabel = null;
    if (start) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      dateLabel = d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short"
      });
    }

    itinerary.push({
      day: i + 1,
      date: dateLabel,
      activity: `${activity}${i >= finalPool.length ? " (relaxed pace)" : ""} ${
        note ? `(${note})` : ""
      }`.trim()
    });
  }

  return itinerary;
}
export default function TripPlanner() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("Medium");
  const [style, setStyle] = useState("Adventure");

const [plan, setPlan] = useState(() => {
  const saved = localStorage.getItem("tripPlan");
  return saved ? JSON.parse(saved).plan : null;
});

const [itinerary, setItinerary] = useState(() => {
  const saved = localStorage.getItem("tripPlan");
  return saved ? JSON.parse(saved).itinerary : [];
});

const [planSettings, setPlanSettings] = useState(() => {
  const saved = localStorage.getItem("tripPlan");
  return saved ? JSON.parse(saved).settings || null : null;
});

const [savedPlans, setSavedPlans] = useState(() => {
  const saved = localStorage.getItem("savedTripPlans");
  return saved ? JSON.parse(saved) : [];
});

const [loading, setLoading] = useState(false);

const generatePlan = () => {
  if (!destination.trim()) {
    alert("Please enter destination");
    return;
  }

  setLoading(true);

  const matched = findDestination(destination);

  const place = matched || {
    name: destination.trim(),
    image: "/images/travel-bg.jpg",
    tags: []
  };

 setTimeout(() => {
  const newItinerary = buildItinerary(place, days, startDate, budget, style);
  const settingsUsed = { destination: destination.trim(), days, budget, style, startDate };

  setPlan(place);
  setItinerary(newItinerary);
  setPlanSettings(settingsUsed);

  localStorage.setItem(
    "tripPlan",
    JSON.stringify({ plan: place, itinerary: newItinerary, settings: settingsUsed })
  );

  setLoading(false);
},
 400);}

const saveCurrentPlan = () => {
  if (!plan) return;

  const newSavedPlan = {
    id: Date.now(),
    plan,
    itinerary,
    settings: planSettings,
    savedAt: new Date().toISOString()
  };

  const updated = [...savedPlans, newSavedPlan];
  setSavedPlans(updated);
  localStorage.setItem("savedTripPlans", JSON.stringify(updated));
};

const loadSavedPlan = (saved) => {
  setPlan(saved.plan);
  setItinerary(saved.itinerary);
  setPlanSettings(saved.settings);

  setDestination(saved.settings?.destination || "");
  setDays(saved.settings?.days || "");
  setBudget(saved.settings?.budget || "Medium");
  setStyle(saved.settings?.style || "Adventure");
  setStartDate(saved.settings?.startDate || "");

  localStorage.setItem(
    "tripPlan",
    JSON.stringify({ plan: saved.plan, itinerary: saved.itinerary, settings: saved.settings })
  );
};

const deleteSavedPlan = (id) => {
  const updated = savedPlans.filter((p) => p.id !== id);
  setSavedPlans(updated);
  localStorage.setItem("savedTripPlans", JSON.stringify(updated));
};

  return (
    <div className="trip-page">
      <div className="trip-container">
        <div className="trip-content">
          <h1>Plan Your Perfect Trip</h1>
          <p>Create your personalized adventure in Egypt</p>

          <div className="trip-form">
            <input
              placeholder="Destination (ex: Dahab)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <input
              type="date"
              placeholder="Start date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <input
              type="number"
              min="1"
              placeholder="Number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />

            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              <option>Adventure</option>
              <option>Relax</option>
              <option>History</option>
            </select>

            <button onClick={generatePlan}>
              {loading ? "Creating..." : "Generate Plan →"}
            </button>
          </div>

          {plan && (
            <div className="itinerary">
              <h2>Your {plan.name} Itinerary</h2>
              <p>
                Duration: {itinerary.length} day
                {itinerary.length > 1 ? "s" : ""}
              </p>
             <p>
  Budget: {planSettings?.budget} • Style: {planSettings?.style}
</p>
              {planSettings &&
              (planSettings.destination !== destination.trim() ||
              planSettings.days !== days ||
              planSettings.budget !== budget ||
              planSettings.style !== style ||
              planSettings.startDate !== startDate) && (
              <p className="outdated-hint">
                 Don't forget to generate a new plan with your updated settings
               </p>
              )}

              <h3>Day-by-Day Plan</h3>

              <ul>
                {itinerary.map((item) => (
                  <li key={item.day}>
                    <strong>
                      Day {item.day}
                      {item.date ? ` (${item.date})` : ""}:
                    </strong>{" "}
                    {item.activity}
                  </li>
                ))}
              </ul>
              <button className="save-plan-btn" onClick={saveCurrentPlan}>
                Save This Plan
                </button>
            </div>
          )}
        </div>
        {savedPlans.length > 0 && (
  <div className="saved-plans-section">
    <h2>Saved Plans</h2>

    <div className="saved-plans-list">
      {savedPlans.map((saved) => (
        <div className="saved-plan-card" key={saved.id}>
          <img src={saved.plan.image} alt={saved.plan.name} />

          <div className="saved-plan-info">
            <h3>{saved.plan.name}</h3>
            <p>
              {saved.itinerary.length} day{saved.itinerary.length > 1 ? "s" : ""} •{" "}
              {saved.settings?.budget} • {saved.settings?.style}
            </p>
          </div>

          <div className="saved-plan-actions">
            <button onClick={() => loadSavedPlan(saved)}>View</button>
            <button className="delete-btn" onClick={() => deleteSavedPlan(saved.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        <div className="trip-image">
          <img src={plan ? plan.image : "/images/dahab.jpg"} />
          <div className="image-overlay">
            <h2>Your next adventure awaits</h2>
            <p>Discover Egypt your way</p>
          </div>
        </div>
      </div>
    </div>
  );
}
