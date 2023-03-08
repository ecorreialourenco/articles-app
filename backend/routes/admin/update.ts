import exress from "express";
import jwt from "jsonwebtoken";
import { RoleEnum } from "../../enum";
import { User, UserDocs } from "../../models";

const router = exress.Router();

router.put("/api/admin-users/:id", async (req, res) => {
  const token = req.headers.authorization;
  let user: UserDocs | null = null;

  if (token) {
    const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;
    const { role } = decodedUser;

    if (role === RoleEnum.ADMINISTRATOR) {
      user = await User.findById(req.params.id);
      if (user) {
        user.role = req.body.role;
        user.save();
      }
    }
  }

  res.status(201).send(user);
});

export { router as updateAdminUsersRouter };
