import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Article, User, UserDocs } from "../../models";

const router = express.Router();

router.get("/api/article/:id", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  let article = null;
  let author = "";

  if (token) {
    const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;

    if (decodedUser) {
      article = await Article.findById(req.params.id);

      const user = await User.findOne({ articles: { _id: req.params.id } });
      if (user) {
        author = user.username;
      }
    }
  }

  res.status(200).send({ article, author });
});

export { router as getArticleRouter };
