import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/use-app-selector";

interface IProps {
  children: React.ReactNode;
  redirect: string;
}

export const Protected: React.FC<IProps> = ({ children, redirect }) => {
  const navigate = useNavigate();
  const { isAuth, access } = useAppSelector(state => state.session);

  useEffect(() => {
    if (!isAuth && !access) {
      navigate(redirect);
    }
  }, [isAuth, access])

  return children;
}