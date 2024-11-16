import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "../hooks/use-app-dispatch";
import { useAppSelector } from "../hooks/use-app-selector";
import { sessionActions } from "../store/session/slice/session-slice";

import { Protected } from "../containers/protected";
import { Layout } from "../containers/layout";
import { Login } from "../pages/login";
import { Rates } from "../pages/rates";
import { Convert } from "../pages/convert";
import { Widget } from "../containers/modals";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { access } = useAppSelector(state => state.session);
  const { currentModal } = useAppSelector(state => state.modals);

  useEffect(() => {
    dispatch(sessionActions.checkAuth());
  }, [access])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Protected redirect="/login"><Layout/></Protected>}>
          <Route index element={<Rates/>}/>
          <Route path="/convert" element={<Convert/>}/>
        </Route>
      </Routes>

      {currentModal === 'widget' && <Widget />}
    </>
  )
}