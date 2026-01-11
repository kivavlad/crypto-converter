import { ReactNode, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { onError } from "../../config/utils";
import { sessionActions } from "../../store/session/slice/session-slice";

interface IProps {
  children: ReactNode;
  redirect: string;
}

export const Protected: React.FC<IProps> = ({ children, redirect }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, access } = useAppSelector(state => state.session);

  const handleAuthError = useCallback(() => {
    dispatch(sessionActions.signOut());
    navigate(redirect, {
      state: { back: location.pathname },
      replace: true,
    });
  }, [navigate, redirect, location.pathname]);

  useEffect(() => {
    dispatch(sessionActions.checkAuth())
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth && !access) {
      handleAuthError();
    }
  }, [isAuth, access, handleAuthError]);

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