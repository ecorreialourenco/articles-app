import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Article, ArticleDocs, UserDocs } from "../../models";
import { RoleEnum, TypeEnum } from "../../enum";
import { filters, RequestParams } from "../../interfaces/request";

const router = express.Router();

router.get(
  "/api/articles",
  async (req: Request<{}, {}, {}, RequestParams>, res: Response) => {
    const pageLimit = 10;
    const { page, category, search } = req.query;
    const token = req.headers.authorization;
    let articles: ArticleDocs[] = [];
    let total: number = 0;

    if (token) {
      const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;
      const userRole = decodedUser.role;
      const filters: filters = category ? { category } : {};
      if (search) {
        filters.title = { $regex: new RegExp(search, "i") };
      }

      if (userRole !== RoleEnum.ADMINISTRATOR) {
        filters.type = TypeEnum.PUBLISHED;
      }
      total = (await Article.find(filters)).length;
      articles = await Article.find(filters)
        .skip(page ? page * pageLimit : 0)
        .limit(pageLimit);
    }

    res.status(200).send({ articles, total });
  }
);

export { router as indexArticlesRouter };
