import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/use-app-selector";

import { Protected } from "../containers/protected";
import { Layout } from "../containers/layout";
import { Login } from "../pages/login";
import { Rates } from "../pages/rates";
import { Convert } from "../pages/convert";
import { Widget } from "../containers/modals";

export const App: React.FC = () => {
  const { currentModal } = useAppSelector(state => state.modals);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Protected redirect="/login"><Layout/></Protected>}>
          <Route index element={<Rates/>}/>
          <Route path="/convert" element={<Convert/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {currentModal === 'widget' && <Widget />}
    </>
  )
}