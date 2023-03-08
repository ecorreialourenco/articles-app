import exress from "express";
import jwt from "jsonwebtoken";
import { RoleEnum } from "../../enum";
import { User, UserDocs } from "../../models";

const router = exress.Router();

router.get("/api/admin-users", async (req, res) => {
  const pageLimit = 10;
  const token = req.headers.authorization;
  const page = parseInt(req.query.page as string);
  let users: UserDocs[] = [];
  let total: number = 0;

  if (token) {
    const decodedUser = jwt.verify(token, process.env.JWT_KEY!) as UserDocs;
    const { role } = decodedUser;

    if (role === RoleEnum.ADMINISTRATOR) {
      users = await User.find()
        .skip(page ? page * pageLimit : 0)
        .limit(pageLimit);

      total = await (await User.find()).length;
    }
  }

  res.status(200).send({ users, total });
});

export { router as indexAdminUsersRouter };
