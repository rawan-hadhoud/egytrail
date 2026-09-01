import "./PopularCard.css";
import { Link } from "react-router-dom";


export default function PopularCard({destination}){


return(

<div className="popular-card">

<button className="favorite">
♡
</button>

<img 
src={destination.image}
alt={destination.name}
/>


<div className="popular-info">


<p className="location">
📍 {destination.governorate}
</p>


<h3>
{destination.name}
</h3>


<div className="tags">

<span>
{destination.category}
</span>


<span>
⭐ {destination.rating}
</span>

</div>


<Link to={`/destinations/${destination.id}`}>
View Details
</Link>


</div>


</div>

)

}