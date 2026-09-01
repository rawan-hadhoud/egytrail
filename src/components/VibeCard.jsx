import "./VibeCard.css";
export default function VibeCard({vibe}){

return(
    <div className="vibe-card">

        <img 
        src={vibe.image}
        alt={vibe.title}
        />

        <div className="vibe-overlay">

            <h3>{vibe.title}</h3>

            <p>{vibe.description}</p>

        </div>

    </div>
)

}