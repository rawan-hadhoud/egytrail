export default function ExperienceCard({experience}){


return (

<div className="experience-card">


<img 
src={experience.image}
alt={experience.title}
/>


<div className="overlay">


<h3>
{experience.title}
</h3>


<p>
{experience.description}
</p>


</div>


</div>

)

}