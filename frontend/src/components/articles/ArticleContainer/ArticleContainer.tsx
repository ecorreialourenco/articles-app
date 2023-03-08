import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonTypeEnum } from "../../../enums/button.enum";
import { Article } from "../../../models";
import { UserContext } from "../../../store";
import { deleteArticle } from "../../../utils/deleteArticle";
import { addFavStatus, removeFavStatus } from "../../../utils/toggleFavStatus";
import { Button, ImagePreview } from "../../form";
import styles from "./ArticleContainer.module.css";

interface ArticleContainerProps {
  item: Article;
  canUpdate?: boolean;
  setArticle?: (id: string) => void;
  updateList: () => void;
}

export const ArticleContainer: FC<ArticleContainerProps> = ({
  item,
  canUpdate,
  setArticle,
  updateList,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleDeleteArticle = async (id: string) => {
    const response = await deleteArticle(id, userContext.token);
    response && updateList();
  };

  const handleFavorite = async (id: string) => {
    isFavorite
      ? await removeFavStatus({ id, token: userContext.token })
      : await addFavStatus({ id, token: userContext.token });
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const checkFavStatus = async () => {
      await fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/favorites/${item.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: userContext.token,
          },
        }
      )
        .then(async (response: Response) => {
          setIsFavorite(await response.json());
        })
        .catch((error) => console.log(error));
    };

    item.id && checkFavStatus();
  }, [item.id, userContext.token]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {canUpdate && <span className={styles.itemType}>{item.type}</span>}
        <ImagePreview title={item.title} image={item.image} />
      </div>
      <div>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{item.title}</h3>
          <FontAwesomeIcon
            className={isFavorite ? styles.favoriteIcon : styles.favIcon}
            onClick={() => handleFavorite(item.id)}
            icon={faHeart}
          />
        </div>
        <span className={styles.description}>{item.description}</span>
        <Button
          label="Read more"
          type={ButtonTypeEnum.PRIMARY}
          onClick={() => navigate(`/article/${item.id}`)}
        />
        {canUpdate && setArticle && (
          <>
            <Button
              label="Update"
              type={ButtonTypeEnum.SECONDARY}
              onClick={() => setArticle(item.id)}
            />
            <Button
              label="Delete"
              type={ButtonTypeEnum.DANGER}
              onClick={() => handleDeleteArticle(item.id)}
            />
          </>
        )}
      </div>
    </div>
  );
};
