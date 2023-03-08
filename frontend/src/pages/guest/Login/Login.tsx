import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ErrorMessage,
  Input,
  InputPassword,
} from "../../../components/form";
import { ButtonTypeEnum } from "../../../enums/button.enum";
import { UserContext } from "../../../store";
import styles from "./Login.module.css";

interface LoginResponse {
  error: string;
  token: string | null;
}

const Login: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigation = useNavigate();
  const userContext = useContext(UserContext);

  const handleSubmit = async () => {
    if (username && password) {
      await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then(async (response: Response) => {
        const responseJson: LoginResponse = await response.json();
        const { error, token } = responseJson;

        if (error) {
          setError(error);
        } else if (token) {
          localStorage.setItem("token", token);
          userContext.setToken(token);
          navigation("/");
        }
      });
    }
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <Input
        label="Username"
        name="username"
        value={username}
        onChange={(value) => setUsername(value)}
      />
      <InputPassword
        label="Password"
        name="password"
        value={password}
        onChange={(value) => setPassword(value)}
      />
      {error && <ErrorMessage message={error} />}
      <div className={styles.loginButton}>
        <Button
          label="Submit"
          onClick={handleSubmit}
          type={ButtonTypeEnum.PRIMARY}
        />
      </div>
    </div>
  );
};

export default Login;
