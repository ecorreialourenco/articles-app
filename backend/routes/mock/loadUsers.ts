import exress from "express";
import { User, UserDocs } from "../../models";

const router = exress.Router();

router.get("/api/mock/load-users", async (req, res) => {
  const savedUsers = await User.find();

  if (!savedUsers.length) {
    const usersJsonFile = require("./users_mock.json");
    await usersJsonFile.forEach(async (item: UserDocs) => {
      await User.create({
        username: item.username,
        password: item.password,
        role: item.role,
      });
    });
  }

  res.status(200).send("Load users");
});

export { router as loadUsersMockDataRouter };
