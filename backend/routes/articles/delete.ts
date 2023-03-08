import express, { Request, Response } from "express";
import { Article, User } from "../../models";

const router = express.Router();

router.delete("/api/articles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await Article.deleteOne({ _id: id });

  const user = await User.find().populate("articles");

  res.status(201).send(user);
});

export { router as deleteArticleRouter };
