import { FC, useContext, useEffect, useState } from "react";
import { ArticleTypeEnum } from "../../../enums/articleType.enum";
import { UserProfile } from "../../../models";
import { UserContext } from "../../../store";
import styles from "./MyProfile.module.css";
import { TextItem } from "./TextItem";

export const MyProfile: FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const userContext = useContext(UserContext);

  const getArticlesCountByType = (type: ArticleTypeEnum) => {
    return profile
      ? profile.articles.filter((item) => item.type === type).length
      : 0;
  };

  useEffect(() => {
    const getProfile = async () => {
      await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.token,
        },
      }).then(async (response: Response) => {
        setProfile(await response.json());
      });
    };

    getProfile();
  }, [userContext.token]);

  return (
    profile && (
      <div className={styles.container}>
        <h1>My Profile</h1>
        <div className={styles.info}>
          <TextItem label="Username" value={profile.username} />
          <TextItem label="Role" value={profile.role} />
        </div>
        <div className={styles.articles}>Articles</div>
        <div className={styles.articlesContainer}>
          <TextItem
            label="Published"
            value={getArticlesCountByType(ArticleTypeEnum.PUBLISHED)}
          />
          <TextItem
            label="Draft"
            value={getArticlesCountByType(ArticleTypeEnum.DRAFT)}
          />
          <TextItem label="Favorites" value={profile.favorites.length} />
        </div>
      </div>
    )
  );
};
