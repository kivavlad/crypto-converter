import { ReactNode, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/use-app-selector";
import { onError } from "../../config/utils";

interface IProps {
  children: ReactNode;
  redirect: string;
}

export const Protected: React.FC<IProps> = ({ children, redirect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, access } = useAppSelector(state => state.session);

  const handleAuthError = useCallback(() => {
    navigate(redirect, {
      state: { back: location.pathname },
      replace: true,
    });
  }, [navigate, redirect, location.pathname]);

  // Проверка авторизации через Redux store
  useEffect(() => {
    if (!isAuth && !access) {
      handleAuthError();
    }
  }, [isAuth, access, handleAuthError]);

  // Подписка на ошибки API
  useEffect(() => {
    const unsubscribeUnauthorized = onError('UNAUTHORIZED', handleAuthError);
    const unsubscribeForbidden = onError('FORBIDDEN', handleAuthError);

    return () => {
      unsubscribeUnauthorized();
      unsubscribeForbidden();
    };
  }, [handleAuthError]);

  return children;
};

export default Protected;