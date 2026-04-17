import { User } from "./user";

export interface Musica {
  id: number;
  titulo: string;
  youtube_url: string;
  views?: number;
  user?: User;
}