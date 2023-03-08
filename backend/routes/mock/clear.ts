import exress from "express";
import { Article, User } from "../../models";

const router = exress.Router();

router.get("/api/mock/clear", async (req, res) => {
  await Article.deleteMany();
  await User.deleteMany();

  res.status(200).send("Clear");
});

export { router as clearMockDataRouter };
