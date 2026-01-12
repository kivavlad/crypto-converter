import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/use-app-selector";

import { Protected } from "../containers/protected";
import { Layout } from "../containers/layout";
import { Login } from "../pages/login";
import { Tokens } from "../pages/tokens";
import { Convert } from "../pages/convert";
import { Widget } from "../containers/modals";

export const App: React.FC = () => {
  const { currentModal } = useAppSelector(state => state.modals);

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<Protected redirect="/login"><Layout/></Protected>}
          children={
            <>
              <Route index element={<Tokens/>}/>
              <Route path="/convert" element={<Convert/>}/>
            </>
          }
        />
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {currentModal === 'widget' && <Widget />}
    </>
  )
}