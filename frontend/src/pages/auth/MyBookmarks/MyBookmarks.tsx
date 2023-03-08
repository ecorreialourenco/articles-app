import { FC, useContext, useEffect, useState } from "react";
import {
  ArticleFilters,
  ArticlesList,
  ArticlesSearch,
} from "../../../components";
import { Article } from "../../../models";
import { PaginatedArticles } from "../../../models/pagination.module";
import { UserContext } from "../../../store";
import { getArticles } from "../../../utils/getArticles";
import styles from "./MyBookmarks.module.css";

export const MyBookmarks: FC = () => {
  const [list, setList] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const userContext = useContext(UserContext);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const handleSearchPage = () => {
    setCurrentPage(0);
    getPaginatedArticles(0);
  };

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
    getPaginatedArticles(newPage);
  };

  const handleChangeCategory = (category: string | null) => {
    setSelectedCategory(category);
    getPaginatedArticles(currentPage);
  };

  const getPaginatedArticles = async (page: number) => {
    const response: PaginatedArticles = await getArticles({
      path: "favorites",
      page,
      category: selectedCategory,
      search,
      token: userContext.token,
    });

    setList(response.articles);
    setTotal(response.total);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const response: PaginatedArticles = await getArticles({
        path: "favorites",
        page: 0,
        token: userContext.token,
      });

      setList(response.articles);
      setTotal(response.total);
    };

    fetchArticles();
    setSearch("");
  }, [userContext.token]);

  return (
    <div className={styles.container}>
      <h1>Bookmarks</h1>
      <div className={styles.actions}>
        <ArticlesSearch
          value={search}
          onSearch={(val) => setSearch(val)}
          onSubmit={() => handleSearchPage()}
        />
        <ArticleFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={handleChangeCategory}
        />
      </div>
      <ArticlesList
        list={list}
        pages={Math.ceil(total / 10)}
        currentPage={currentPage}
        onPageChange={handleChangePage}
        updateList={() => getPaginatedArticles(currentPage)}
      />
    </div>
  );
};
