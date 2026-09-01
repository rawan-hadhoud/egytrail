import "./Home.css";

import {vibes} from "../data/vibes";
import { destinations } from "../data/destinations";

import VibeCard from "../components/VibeCard";
import PopularCard from "../components/PopularCard";

import {useEffect,useState} from "react";
import CTA from "../components/CTA";
import WhyChoose from "../components/WhyChoose";
import Footer from "../components/Footer";
import DestinationCard from "../components/DestinationCard";

export function Home(){ 



return(

<div className="home">

<section className="hero">

<div className="hero-content">


<h1>
Discover Egypt
<br/>
Your Next Adventure Starts Here
</h1>


<p>
Explore hidden places, ancient history,
and unforgettable experiences.
</p>



<div className="search-box">

<input 
placeholder="Where do you want to go?"
/>


<button>
Search
</button>


</div>



<div className="stats">


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


</div>


</div>


</section>

<section className="vibes">

<h2>
Pick Your Vibe
</h2>


<div className="vibes-grid">

{
vibes.map((vibe)=>(

<VibeCard 
key={vibe.id}
vibe={vibe}
/>

))
}


</div>

</section>

<section className="popular-section">


<div className="popular-header">

<h2>
Popular Destinations
</h2>


<a className="view-all">
View All →
</a>

</div>



<div className="destinations-grid">

{
destinations.map((destination)=>(

<DestinationCard

key={destination.id}

destination={destination}

/>

))

}

</div>


</section>
<WhyChoose />

<CTA/>

<Footer />

</div>

)

}