import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../../models";

const router = express.Router();

router.post(
  "/api/login",
  [
    body("username").isString().withMessage("Username must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    let error = "";
    let match = false;
    let token = "";

    if (user) {
      match = user && (await bcrypt.compare(password, user.password));
      req.session = { user };
      token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_KEY!
      );
    }

    if (!user || !match) {
      error = "Wrong username of password";
    }

    res.send({ error, token });
  }
);

export { router as loginRouter };
