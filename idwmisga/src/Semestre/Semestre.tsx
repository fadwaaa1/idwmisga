import { useState } from "react";
import type { Semestre as SemestreType } from "../Models";

type SemestreProps = {
  sem: SemestreType;
};

function Semestre({ sem }: SemestreProps) {
  const [showModules, setShowModules] = useState(false);

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{sem.nom}</h5>
        <p className="card-text text-muted">
          ID du semestre : {sem.id}
        </p>
        
        <button 
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setShowModules(!showModules)}
        >
          {showModules ? "Masquer les modules" : `Voir les ${sem.modules?.length || 0} modules`}
        </button>

        {showModules && (
          <ul className="list-group list-group-flush mt-3">
            {sem.modules?.map((mod) => (
              <li key={mod.id} className="list-group-item">
                {mod.nom}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Semestre;