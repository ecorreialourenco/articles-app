import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserDocs } from "../../models";

const router = express.Router();

router.post("/api/favorites", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { id } = req.body;

  if (token) {
    const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;

    const user = await User.findById(decodedUser.id);
    if (!user) throw new Error("User not found");

    user.favorites.push(id);
    user.save();

    res.status(201).send(user);
  }
});

export { router as newFavoritesRouter };
