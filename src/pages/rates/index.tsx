import { useEffect, useCallback, useState } from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { loadRates } from "../../store/rates/services/load-rates";
import { sessionActions } from "../../store/session/slice/session-slice";

import { Head } from "../../components/head";
import { List } from "../../components/list";
import { CoinItem } from "../../components/coin-item";
import { IRate } from "../../store/rates/types/rates-types";
import cls from "./style.module.scss";

export const Rates: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(state => state.rates);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    if (fetching) {
      dispatch(loadRates());
      setFetching(false);
    }
  }, [fetching])

  const callbacks = {
    onReload: () => setFetching(true),
    onLogout: () => dispatch(sessionActions.signOut()),
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
        <List 
          list={list}
          renderItems={renders.item}
        />
      </div>
    </div>
  )
}