import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { sessionActions } from "../../store/session/slice/session-slice";
import { loadRates } from "../../store/rates/services/load-rates";
import { Head } from "../../components/head";
import { ConvertForm } from "../../containers/convert-form";

export const Convert: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadRates())
  }, [])

  const callbacks = {
    onLogout: () => {
      dispatch(sessionActions.signOut());
      navigate("/login");
    }
  }

  return (
    <div className="container">
      <Head title="Convert" onLogout={callbacks.onLogout}/>
      <ConvertForm />
    </div>
  )
}