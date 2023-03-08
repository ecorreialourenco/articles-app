import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Article, ArticleDocs, User, UserDocs } from "../../models";
import { RequestParams, filters } from "../../interfaces/request";
import { RoleEnum } from "../../enum";

const router = express.Router();

router.get(
  "/api/my-articles",
  async (req: Request<{}, {}, {}, RequestParams>, res: Response) => {
    const pageLimit = 10;
    const { page, category, search } = req.query;
    const token = req.headers.authorization;
    let articles: ArticleDocs[] = [];
    let total = 0;

    if (token) {
      const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;
      const { id, role } = decodedUser;
      const filters: filters = category ? { category } : {};
      if (search) {
        filters.title = { $regex: new RegExp(search, "i") };
      }

      if (role === RoleEnum.ADMINISTRATOR) {
        articles = await Article.find(filters)
          .skip(page ? page * pageLimit : 0)
          .limit(pageLimit);
        total = (await Article.find(filters)).length;
      } else {
        const user = await User.findById(id).populate("articles");

        if (user) {
          const articlesIdList: string[] = user.articles.map(
            (item: ArticleDocs) => item.id
          );

          if (articlesIdList) {
            filters._id = { $in: articlesIdList };
          }

          articles = await Article.find(filters)
            .skip(page ? page * pageLimit : 0)
            .limit(pageLimit);
          total = (await Article.find(filters)).length;
        }
      }
    }

    res.status(200).send({ articles, total });
  }
);

export { router as myArticlesRouter };
