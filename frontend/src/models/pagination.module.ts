import { Article } from "./article.model";
import { UserProfile } from "./user.model";

export interface PaginatedUsers {
  users: UserProfile[];
  total: number;
}

export interface PaginatedArticles {
  articles: Article[];
  total: number;
}
