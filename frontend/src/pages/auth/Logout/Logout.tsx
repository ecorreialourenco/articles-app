import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../store";

export const Logout: FC = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext.token) {
      localStorage.removeItem("token");
      userContext.setToken("");
      navigate("/");
    }
  }, [userContext, navigate]);

  return <div>Logout</div>;
};
