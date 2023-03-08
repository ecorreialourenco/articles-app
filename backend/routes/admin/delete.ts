import express, { Request, Response } from "express";
import { Article, User } from "../../models";

const router = express.Router();

router.delete("/api/admin-users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    user.articles.forEach(async (article) => {
      await Article.deleteOne({ _id: article });
    });
  }

  await User.deleteOne({ _id: id });

  res.status(201).send("User deleted");
});

export { router as deleteAdminUserRouter };
