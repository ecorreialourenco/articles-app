import { Routes, Route } from "react-router-dom";
// Pages
import { Articles } from "../pages/auth/Articles";
import { MyArticles } from "../pages/auth/MyArticles/MyArticles";
import { Home } from "../pages/auth/Home";
import { MyBookmarks } from "../pages/auth/MyBookmarks";
import { MyProfile } from "../pages/auth/MyProfile";
import { Logout } from "../pages/auth/Logout";
import { Admin } from "../pages/auth/Admin";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/my-bookmarks" element={<MyBookmarks />} />
      <Route path="/my-articles" element={<MyArticles />} />
      <Route path="/article/:id" element={<Articles />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};
