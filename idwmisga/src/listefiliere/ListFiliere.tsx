import { useState } from "react";
import Filiere from "../filieres/Filiere";
import datafiliere from "../data/datafiliere.json";
import type { Filiere as FiliereType } from "../Models";
// On remonte de 2 niveaux (../../) pour sortir de "src" et aller dans "shared"
import Pagination from "../../shared/pagination";
// Service partagé (Singleton) qui retourne des Observables RxJS
import { userService } from "../../shared/services/user.service";
import type { User } from "../../shared/services/user.service";
import { finalize } from "rxjs";

const filieres = datafiliere as FiliereType[];

function ListFiliere() {
  const itemPerPage = 3;
  const totalPage = Math.ceil(filieres.length / itemPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  // Liste des utilisateurs récupérés depuis l'API (typée avec l'interface User)
  const [users, setUsers] = useState<User[]>([]);
  // État de chargement : true pendant l'appel API, false une fois terminé
  const [loading, setLoading] = useState(false);

  // Fonction appelée au clic sur le bouton "Get Users".
  // Programmation réactive : on s'abonne à l'Observable du service
  // partagé (pas de async/await ni .then dans le composant).
  const getusers = () => {
    // loading à true pendant la requête -> affiche le spinner
    setLoading(true);

    // finalize garantit setLoading(false) à la fin, succès ou erreur
    userService
      .getUsers()
      .pipe(finalize(() => setLoading(false)))
      .subscribe({
        // next : on reçoit le tableau d'utilisateurs et on met à jour le state
        next: (data) => setUsers(data),
        error: (err) => console.error(err),
      });
  };

  const debut = (currentPage - 1) * itemPerPage;
  const fin = debut + itemPerPage;

  const goToPage = (page: number): void => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Test</h1>

      <div className="text-center mb-4">
        {/* Bouton qui déclenche le chargement des utilisateurs */}
        <button className="btn btn-primary me-2" onClick={getusers}>
          Get Users
        </button>
        {/* Spinner Bootstrap affiché pendant le chargement */}
        {loading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>

      <div className="list-group mb-4">
        {users.map((user) => (
          <div className="list-group-item" key={user.id}>
            <h2>{user.name}</h2>
            <p className="mb-0">{user.email}</p>
          </div>
        ))}
      </div>

      <h1 className="text-center mb-4">Liste des filières</h1>

      <div className="row g-4">
        {filieres.slice(debut, fin).map((f) => (
          <div className="col-md-4" key={f.id}>
            <Filiere
              nom={f.nom}
              description={f.description}
              image={f.image}
              semestres={f.semestres}
            />
          </div>
        ))}
      </div>

      {totalPage > 1 && (
        <div className="mt-5">
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onChangePage={goToPage}
          />
        </div>
      )}

      <p className="text-center text-muted mt-3">
        Page {currentPage} sur {totalPage}
      </p>
    </div>
  );
}

export default ListFiliere;