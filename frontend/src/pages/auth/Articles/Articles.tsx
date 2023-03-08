import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ImagePreview } from "../../../components";
import { ButtonTypeEnum } from "../../../enums/button.enum";
import { Article } from "../../../models";
import { ArticlesResponse } from "../../../models/response";
import { UserContext } from "../../../store";
import { getArticleById } from "../../../utils/getArticleById";
import styles from "./Articles.module.css";

export const Articles: FC = () => {
  const [item, setItem] = useState<Article | null>(null);
  const [author, setAuthor] = useState<string>("");
  const { id } = useParams();
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyArticles = async () => {
      const response: ArticlesResponse = await getArticleById(
        id!,
        userContext.token
      );
      setItem(response.article);
      setAuthor(response.author);
    };

    id && getMyArticles();
  }, [id, userContext.token]);

  return (
    <div>
      <Button
        label="Go back"
        onClick={() => navigate(-1)}
        type={ButtonTypeEnum.PRIMARY}
      />
      {item && (
        <>
          <div>
            {item.type} by: {author}
          </div>
          <div className={styles.container}>
            <div className={styles.imageContainer}>
              <ImagePreview title={item.title} image={item.image} />
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.title}>{item.title}</h3>
              <h5 className={styles.description}>{item.description}</h5>
              <span className={styles.description}>{item.content}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
