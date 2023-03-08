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
import styles from "./Signup.module.css";

interface SignupResponse {
  error: string;
  token: string | null;
}

const Signup: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigation = useNavigate();
  const userContext = useContext(UserContext);

  const handleSubmit = async () => {
    if (password !== password2) {
      setError("Passwords don't match");
    }
    if (username && password) {
      await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then(async (response: Response) => {
        const responseJson: SignupResponse = await response.json();
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
    <div className={styles.signup}>
      <h1>Signup</h1>
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
      <InputPassword
        label="Password"
        name="password2"
        value={password2}
        onChange={(value) => setPassword2(value)}
      />
      {error && <ErrorMessage message={error} />}
      <div className={styles.signupButton}>
        <Button
          label="Signup"
          onClick={handleSubmit}
          type={ButtonTypeEnum.PRIMARY}
        />
      </div>
    </div>
  );
};

export default Signup;
