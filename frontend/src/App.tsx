import React, { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import { UserContext, UiContext } from "./store";
import "./App.css";
import { AuthRoutes, GuestRoutes } from "./routes";

function App() {
  const [token, setToken] = useState<string>("");
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [backdropClick, setBackdropClick] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <UiContext.Provider
      value={{ showBackdrop, setShowBackdrop, backdropClick, setBackdropClick }}
    >
      <UserContext.Provider value={{ token, setToken }}>
        <Layout>{token ? <AuthRoutes /> : <GuestRoutes />}</Layout>
      </UserContext.Provider>
    </UiContext.Provider>
  );
}

export default App;
