import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Article, User, UserDocs } from "../../models";

const router = express.Router();

router.post("/api/articles", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { title, description, image, category, content, type } = req.body;

  if (token) {
    const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;

    const user = await User.findById(decodedUser.id);
    if (!user) throw new Error("User not found");

    const newArticle = await Article.create({
      title,
      description,
      image,
      category,
      content,
      type,
    });

    user.articles.push(newArticle);
    user.save();

    res.status(201).send(newArticle);
  }
});

export { router as newArticlesRouter };
