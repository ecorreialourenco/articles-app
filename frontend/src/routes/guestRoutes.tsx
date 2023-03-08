import { Routes, Route } from "react-router-dom";
// Pages
import Login from "../pages/guest/Login/Login";
import Signup from "../pages/guest/Signup/Signup";

export const GuestRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
