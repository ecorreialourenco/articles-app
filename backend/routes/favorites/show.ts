import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ArticleDocs, User, UserDocs } from "../../models";

const router = express.Router();

router.get("/api/favorites/:id", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  let isIncluded: boolean = false;

  if (token) {
    const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;
    const id = decodedUser.id;

    const user = await User.findById(id).populate("favorites");

    if (user) {
      isIncluded = !!user.favorites.find(
        (item: ArticleDocs) => item.id === req.params.id
      );
    }
  }

  res.status(200).send(isIncluded);
});

export { router as showFavoritesRouter };
