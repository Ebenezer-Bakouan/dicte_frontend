export interface DictationParams {
  age: number;
  niveauScolaire: string;
  objectifApprentissage: string;
  difficultesSpecifiques: string;
  tempsDisponible: number;
  niveau: string;
  sujet: string;
  longueurTexte: string;
  typeContenu: string;
}

export interface DictationResponse {
  id: number;
  text: string;
  audio_url: string;
  title: string;
  difficulty: string;
} 