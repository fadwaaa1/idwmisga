import { from, mergeMap, catchError, of } from "rxjs";
import type { Observable } from "rxjs";

// URL de base de l'API (JSONPlaceholder)
const BASE_URL = "https://jsonplaceholder.typicode.com/";

// Interface qui décrit la forme d'un utilisateur renvoyé par l'API
export interface User {
  id: number;
  name: string;
  email: string;
}

// Service partagé : toute la logique de communication avec le backend
// est centralisée ici (Singleton).
class UserService {
  private baseUrl = BASE_URL;

  // Retourne un Observable au lieu d'une Promise.
  // Les composants s'abonneront avec .subscribe() au lieu d'utiliser await/.then.
  getUsers(): Observable<User[]> {
    // fetch() retourne une Promise -> from() la convertit en Observable
    return from(fetch(this.baseUrl + "users")).pipe(
      // response.json() retourne aussi une Promise -> mergeMap aplatit
      // le Observable pour émettre directement le tableau d'utilisateurs
      mergeMap((response) => response.json()),
      // En cas d'erreur réseau, on loggue et on émet un tableau vide
      // pour que l'application ne plante pas
      catchError((error) => {
        console.error(error);
        return of([] as User[]);
      })
    );
  }
}

// Instance unique partagée par toute l'application (Singleton)
export const userService = new UserService();
