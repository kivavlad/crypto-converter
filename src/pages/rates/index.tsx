import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { loadRates } from "../../store/rates/services/load-rates";
import { sessionActions } from "../../store/session/slice/session-slice";
import { ratesActions } from "../../store/rates/slice/rates-slice";
import { modalsActions } from "../../store/modals/slice/modals-slice";

import { Head } from "../../components/head";
import { Spinner } from "../../components/spinner";
import { List } from "../../components/list";
import { CoinItem } from "../../components/coin-item";
import { IRate } from "../../store/rates/types/rates-types";
import cls from "./style.module.scss";

export const Rates: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading } = useAppSelector(state => state.rates);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    if (fetching) {
      dispatch(loadRates());
      setFetching(false);
    }
  }, [fetching])

  const callbacks = {
    onReload: () => {
      setFetching(true);
    },
    onLogout: () => {
      dispatch(sessionActions.signOut());
      navigate("/login");
    },
    onSelect: useCallback((rate: IRate) => {
      dispatch(ratesActions.setCurrentRate(rate));
      dispatch(modalsActions.open('widget'));
    }, [])
  }

  const renders = {
    item: useCallback((item: IRate) => {
      return <CoinItem item={item} />
    }, [])
  }

  return (
    <div className="container">
      <div className={cls.rates}>
        <Head
          title="Rates"
          onReload={callbacks.onReload}
          onLogout={callbacks.onLogout}
        />
        <Spinner active={loading}>
          <List 
            list={list} 
            renderItems={renders.item}
            onSelect={callbacks.onSelect}
          />
        </Spinner>
      </div>
    </div>
  )
}