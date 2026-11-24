export interface Module {
  id: number;
  nom: string;
}

export interface Semestre {
  id: number;
  nom: string;
  modules: Module[];
}

export interface Filiere {
  id: number;
  nom: string;
  description: string;
  image: string;
  semestres: Semestre[];
}