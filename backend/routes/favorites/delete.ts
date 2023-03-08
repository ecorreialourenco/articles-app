import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ArticleDocs, User, UserDocs } from "../../models";

const router = express.Router();

router.delete("/api/favorites/:id", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { id } = req.body;

  if (token) {
    const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;

    const user = await User.findById(decodedUser.id).populate("favorites");
    if (!user) throw new Error("User not found");

    const favIdx = user.favorites.findIndex(
      (item: ArticleDocs) => item.id === id
    );

    user.favorites.splice(favIdx, 1);
    user.save();

    res.status(201).send(user);
  }
});

export { router as deleteFavoritesRouter };
