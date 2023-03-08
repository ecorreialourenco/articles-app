import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RoleEnum } from "../../enum/role.enum";
import { User } from "../../models";

const router = express.Router();

router.post("/api/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.create({
    username,
    password: await bcrypt.hash(password, 10),
    role: RoleEnum.USER,
  });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_KEY!
  );

  res.status(201).send({ error: null, token });
});

export { router as signupRouter };
