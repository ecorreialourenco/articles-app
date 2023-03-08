import { Article } from "./article.model";

export interface ArticlesResponse {
  article: Article;
  author: string;
}
