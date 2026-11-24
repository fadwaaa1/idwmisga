import { useContext, useState } from "react";
import { ThemeContext } from "../../shared/Context";
import type { Semestre as SemestreType } from "../Models";
// On importe ton composant de liste
import ListSemestre from "../Semestre/ListSemestre"; 

type FiliereProps = {
  nom: string;
  description: string;
  image: string;
  semestres: SemestreType[];
};

function Filiere({ nom, description, image, semestres }: FiliereProps) {
  const [displaySem, setDisplaySem] = useState(false);
  const ctx = useContext(ThemeContext);

  const cardClass = ctx.theme === "dark" ? "card h-100 shadow-sm bg-dark text-light" : "card h-100 shadow-sm";

  return (
    <div className={cardClass}>
      <img 
        src={image} 
        className="card-img-top" 
        alt={nom} 
        style={{ height: "180px", objectFit: "cover" }} 
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nom}</h5>
        <p className="card-text text-muted flex-grow-1">{description}</p>
        
        <button 
          className="btn btn-outline-primary btn-sm mt-2"
          onClick={() => setDisplaySem(!displaySem)}
        >
          {displaySem ? "Masquer" : `Voir les ${semestres?.length || 0} semestres`}
        </button>
      </div>

      {displaySem && (
        <div className={ctx.theme === "dark" ? "card-footer bg-secondary text-light" : "card-footer bg-light"}>
          <h6 className="fw-bold mb-2">Semestres :</h6>
          {/* On utilise le composant ListSemestre ici ! */}
          <ListSemestre sems={semestres} />
        </div>
      )}
    </div>
  );
}

export default Filiere;