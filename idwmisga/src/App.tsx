import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// On va chercher le fichier dans le dossier "listefiliere"
import ListFiliere from "./listefiliere/ListFiliere";
// Page d'accueil
import Home from "./home/Home";
import Navbar from "../shared/Navbar";
import { ThemeContext } from "../shared/Context";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [theme, setTheme] = useState("light");

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    // BrowserRouter active le routing dans toute l'application
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
        <div className={theme === "dark" ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"}>
          <Navbar />
          {/* Routes : chaque path affiche un composant différent */}
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<Home />} />
            {/* Liste des filières + utilisateurs */}
            <Route path="/filieres" element={<ListFiliere />} />
          </Routes>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
