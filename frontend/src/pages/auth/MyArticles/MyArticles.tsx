import { FC, useContext, useEffect, useState } from "react";
import {
  ArticleFilters,
  ArticlesList,
  ArticlesSearch,
} from "../../../components";
import { Button } from "../../../components/form";
import { Modal } from "../../../components/Modal";
import { ButtonTypeEnum } from "../../../enums/button.enum";
import { Article } from "../../../models";
import { PaginatedArticles } from "../../../models/pagination.module";
import { UserContext } from "../../../store";
import { getArticles } from "../../../utils/getArticles";
import { ArticlesForm } from "./ArticlesForm";
import styles from "./MyArticles.module.css";

export const MyArticles: FC = () => {
  const [list, setList] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const userContext = useContext(UserContext);
  const [search, setSearch] = useState<string>("");

  const handleNewArticle = () => {
    setSelectedArticle("");
    setIsModalOpen(!isModalOpen);
  };

  const handleUpdateArticle = (id: string) => {
    setSelectedArticle(id);
    setIsModalOpen(true);
  };

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
      path: "my-articles",
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
        path: "my-articles",
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
    <div>
      <h1>My Articles</h1>
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
        <Button
          label="New Article"
          onClick={handleNewArticle}
          type={ButtonTypeEnum.SECONDARY}
        />
      </div>

      <ArticlesList
        list={list}
        pages={Math.ceil(total / 10)}
        currentPage={currentPage}
        onPageChange={handleChangePage}
        canUpdate={true}
        setArticle={handleUpdateArticle}
        updateList={() => getPaginatedArticles(currentPage)}
      />

      <Modal
        isOpen={isModalOpen}
        title={selectedArticle ? "Update Article" : "New Article"}
        onClose={() => setIsModalOpen(false)}
      >
        <ArticlesForm
          id={selectedArticle}
          onClose={() => setIsModalOpen(false)}
          updateList={() => getPaginatedArticles(currentPage)}
        />
      </Modal>
    </div>
  );
};
