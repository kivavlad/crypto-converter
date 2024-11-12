import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { sessionActions } from "../../store/session/slice/session-slice";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import cls from "./style.module.scss";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector(state => state.session);

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (active) {
      dispatch(sessionActions.signIn({login, password}));
      setLogin('');
      setPassword('');
      navigate("/");
    }
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
      <h3>Welcome back!</h3>
      <Input 
        type='text' 
        placeholder="Login" 
        error={error}
        value={login} 
        onChange={setLogin} 
      />
      <Input 
        type='password' 
        placeholder="Password" 
        error={error}
        value={password} 
        onChange={setPassword} 
      />
      <Button 
        type='submit' 
        title="Sign in" 
        active={active}
      />
    </form>
  )
}