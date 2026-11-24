import Semestre from "./Semestre";
import type { Semestre as SemestreType } from "../Models";

type ListSemestreProps = {
  sems: SemestreType[];
};

function ListSemestre({ sems }: ListSemestreProps) {
  if (!sems || sems.length === 0) {
    return <p className="text-muted">Aucun semestre disponible.</p>;
  }

  return (
    <div>
      {sems.map((semestre) => (
        <Semestre key={semestre.id} sem={semestre} />
      ))}
    </div>
  );
}

export default ListSemestre;