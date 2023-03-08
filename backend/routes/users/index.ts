import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserDocs } from "../../models";

const router = express.Router();

router.get("/api/user", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  let user = null;

  if (token) {
    const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;
    const { id } = decodedUser;
    user = await User.findById(id).populate("articles").populate("favorites");
  }

  res.status(200).send(user);
});

export { router as indexUserRouter };
