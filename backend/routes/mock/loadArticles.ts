import exress from "express";
import { TypeEnum } from "../../enum";
import { Article, ArticleDocs, User } from "../../models";

const router = exress.Router();

router.get("/api/mock/load-articles", async (req, res) => {
  const savedArticles = await Article.find();

  if (!savedArticles.length) {
    const loadFile = async (file: string) => {
      const articlesJsonFile = require(file);
      const usersList = await User.find();

      return (
        usersList.length &&
        articlesJsonFile.forEach(async (item: ArticleDocs) => {
          const newArticle = await Article.create({
            title: item.title,
            description: item.description,
            category: item.category,
            content: item.content,
            type: item.type || TypeEnum.DRAFT,
            image: "",
          });

          let rand = Math.random() * usersList.length;
          rand = Math.floor(rand);
          const userId = usersList[rand].id;

          if (userId) {
            const user = await User.findById(userId);
            if (user) {
              user.articles.push(newArticle);
              user.save();
            }
          }
        })
      );
    };

    await loadFile("./articles_mock1.json");
    await loadFile("./articles_mock2.json");
  }

  res.status(200).send("Load articles");
});

export { router as loadArticlesMockDataRouter };
