import { FC } from "react";
import { Article } from "../../../models";
import { ArticleContainer } from "../ArticleContainer";
import { Pagination } from "../../Pagination";
import styles from "./ArticlesList.module.css";

interface ArticlesListProps {
  list: Article[];
  pages: number;
  currentPage: number;
  onPageChange: (val: number) => void;
  canUpdate?: boolean;
  setArticle?: (id: string) => void;
  updateList: () => void;
}

export const ArticlesList: FC<ArticlesListProps> = ({
  list,
  pages,
  currentPage,
  onPageChange,
  canUpdate,
  setArticle,
  updateList,
}) => {
  const handlePageChange = (val: number) => {
    onPageChange(val);
  };

  return (
    <>
      <div className={styles.list}>
        {list.map((item: Article) => {
          return (
            <ArticleContainer
              key={item.id}
              item={item}
              canUpdate={canUpdate}
              setArticle={setArticle}
              updateList={updateList}
            />
          );
        })}
      </div>
      {pages > 1 && (
        <Pagination
          pages={pages}
          current={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};
