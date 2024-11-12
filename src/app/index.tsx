import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "../hooks/use-app-dispatch";
import { useAppSelector } from "../hooks/use-app-selector";
import { sessionActions } from "../store/session/slice/session-slice";
import { Login } from "../pages/login";
import { Rates } from "../pages/rates";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { access, isAuth } = useAppSelector(state => state.session);

  useEffect(() => {
    dispatch(sessionActions.checkAuth());
  }, [access])

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      {isAuth && <Route path="/" element={<Rates/>}/>}
    </Routes>
  )
}