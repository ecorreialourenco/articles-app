import express, { Request, Response } from "express";
import { Article } from "../../models";

const router = express.Router();

router.put("/api/articles/:id", async (req: Request, res: Response) => {
  const { title, description, image, category, content, type } = req.body;
  const article = await Article.findById(req.params.id);

  if (!!article) {
    article.set({ title, description, image, category, content, type });
    article.save();

    res.send(article);
  }

  res.send("Not found");
});

export { router as updateArticleRouter };
