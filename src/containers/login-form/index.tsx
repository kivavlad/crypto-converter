import { useState, useEffect } from "react";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import cls from "./style.module.scss";

export const LoginForm: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (login.trim() && password.trim()) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [login, password])

  return (
    <form className={cls.form} onSubmit={onSubmit}>
      <h3>Вход</h3>
      <Input type='text' placeholder="Логин" value={login} onChange={setLogin} />
      <Input type='password' placeholder="Пароль" value={password} onChange={setPassword} />
      <Button type='submit' title="Войти" active={active}/>
    </form>
  )
}