import { Article } from "./article.model";

export interface UserProfile {
  articles: Article[];
  favorites: Article[];
  id: string;
  password: string;
  role: string;
  username: string;
}
