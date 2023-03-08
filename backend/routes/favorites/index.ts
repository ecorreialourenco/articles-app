import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Article, ArticleDocs, User, UserDocs } from "../../models";
import { filters, RequestParams } from "../../interfaces/request";

const router = express.Router();

router.get(
  "/api/favorites",
  async (req: Request<{}, {}, {}, RequestParams>, res: Response) => {
    const pageLimit = 10;
    const { page, category, search } = req.query;
    const token = req.headers.authorization;
    let articles: ArticleDocs[] = [];
    let total: number = 0;

    if (token) {
      const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;

      const user = await User.findOne({ id: decodedUser.id }).populate(
        "favorites"
      );

      const filters: filters = category ? { category } : {};
      if (search) {
        filters.title = { $regex: new RegExp(search, "i") };
      }

      if (user) {
        const articlesIdList: string[] = user.favorites.map(
          (item: ArticleDocs) => item.id
        );

        if (articlesIdList) {
          filters._id = { $in: articlesIdList };
        }

        total = (await Article.find({ _id: { $in: articlesIdList } })).length;
        articles = await Article.find({ _id: { $in: articlesIdList } })
          .skip(page ? page * pageLimit : 0)
          .limit(pageLimit);
      }
    }

    res.status(200).send({ articles, total });
  }
);

export { router as indexFavoritesRouter };
