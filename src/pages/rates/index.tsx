import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useFilters } from '../../hooks/use-filters';
import { loadRates } from "../../store/rates/services/load-rates";
import { sessionActions } from "../../store/session/slice/session-slice";
import { ratesActions } from "../../store/rates/slice/rates-slice";
import { modalsActions } from "../../store/modals/slice/modals-slice";
import { sorted } from "../../utils/sorted";

import { Head } from "../../components/head";
import { NavMenu } from "../../components/nav-menu";
import { Select } from "../../components/select";
import { Pagination } from "../../components/pagination";
import { Spinner } from "../../components/spinner";
import { List } from "../../components/list";
import { CoinItem } from "../../components/coin-item";
import { Input } from "../../components/input";
import { IRate, SortOrder } from "../../store/rates/types/rates-types";
import cls from "./style.module.scss";

const sortOrders: SortOrder[] = ['asc', 'desc'];
const limitOrders: string[] = ['10', '25', '50', '100'];

export const Rates: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { list, total, loading, fetching } =
    useAppSelector((state) => state.rates);

  const { page, limit, sort, search, setSearch, setPage, setLimit, setSort } =
    useFilters();

  const sortedList = sorted(list, { limit: Number(limit), page, sort, search});

  useEffect(() => {
    if (fetching) {
      dispatch(loadRates());
    }
  }, [fetching])

  const callbacks = {
    onReload: () => {
      dispatch(ratesActions.setFetching(true));
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
      <Head
        title="Rates"
        onReload={callbacks.onReload}
        onLogout={callbacks.onLogout}
      />
      <NavMenu>
        <Select 
          options={limitOrders}
          theme='small'
          value={limit}
          onChange={setLimit}
        />
        <Select 
          options={sortOrders}
          theme='small'
          value={sort}
          onChange={setSort}
        />
        <Pagination
          total={total}
          limit={Number(limit)}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </NavMenu>
      <Spinner active={loading}>
        <div className={cls.wrapper}>
          <Input
            type="search"
            value={search}
            placeholder="Search coins"
            onChange={(e) => setSearch(e.target.value)}
          />
          <List 
            list={sortedList} 
            renderItems={renders.item}
            onSelect={callbacks.onSelect}
          />
        </div>
      </Spinner>
    </div>
  )
}