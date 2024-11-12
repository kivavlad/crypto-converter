import { LoginForm } from "../../containers/login-form";
import cls from "./style.module.scss";

export const Login: React.FC = () => {
  return (
    <div className="container">
      <div className={cls.login}>
        <LoginForm />
      </div>
    </div>
  )
}