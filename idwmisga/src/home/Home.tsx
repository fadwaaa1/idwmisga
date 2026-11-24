import { Link } from "react-router-dom";

// Page d'accueil de l'application
function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1>Bienvenue</h1>
      <p className="text-muted">
        Page d'accueil de l'application IDWMISGA.
      </p>
      {/* Lien de navigation vers la liste des filières */}
      <Link to="/filieres" className="btn btn-primary">
        Liste des filières
      </Link>
    </div>
  );
}

export default Home;
