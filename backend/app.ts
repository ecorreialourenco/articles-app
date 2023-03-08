import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
// Routes
/* Auth routes */
import { loginRouter } from "./routes/auth/login";
import { signupRouter } from "./routes/auth/signup";
import { logoutRouter } from "./routes/auth/logout";

/* Articles routes */
import { indexArticlesRouter } from "./routes/articles/index";
import { getArticleRouter } from "./routes/articles/getOne";
import { myArticlesRouter } from "./routes/articles/show";
import { newArticlesRouter } from "./routes/articles/new";
import { updateArticleRouter } from "./routes/articles/update";
import { deleteArticleRouter } from "./routes/articles/delete";

/* Favorites routes */
import { indexFavoritesRouter } from "./routes/favorites";
import { newFavoritesRouter } from "./routes/favorites/new";
import { showFavoritesRouter } from "./routes/favorites/show";
import { deleteFavoritesRouter } from "./routes/favorites/delete";

/* User routes */
import { indexUserRouter } from "./routes/users";

/* Admin routes */
import { indexAdminUsersRouter } from "./routes/admin";
import { updateAdminUsersRouter } from "./routes/admin/update";
import { deleteAdminUserRouter } from "./routes/admin/delete";

import { loadUsersMockDataRouter } from "./routes/mock/loadUsers";
import { clearMockDataRouter } from "./routes/mock/clear";
import { loadArticlesMockDataRouter } from "./routes/mock/loadArticles";

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(cors(options));
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    // In Jest test, the connection was made in HTTP
    secure: process.env.NODE_ENV !== "test",
  })
);

/* Auth routes */
app.use(loginRouter);
app.use(signupRouter);
app.use(logoutRouter);

/* Articles routes */
app.use(indexArticlesRouter);
app.use(getArticleRouter);
app.use(myArticlesRouter);
app.use(newArticlesRouter);
app.use(updateArticleRouter);
app.use(deleteArticleRouter);

/* Favorites routes */
app.use(indexFavoritesRouter);
app.use(newFavoritesRouter);
app.use(showFavoritesRouter);
app.use(deleteFavoritesRouter);

/* User routes */
app.use(indexUserRouter);

/* Admin routes */
app.use(indexAdminUsersRouter);
app.use(updateAdminUsersRouter);
app.use(deleteAdminUserRouter);

app.use(loadUsersMockDataRouter);
app.use(loadArticlesMockDataRouter);
app.use(clearMockDataRouter);

export { app };
