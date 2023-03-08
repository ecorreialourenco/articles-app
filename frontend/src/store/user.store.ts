import { createContext } from "react";

interface UserContextProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextProps>({
  token: "",
  setToken: () => {},
});
