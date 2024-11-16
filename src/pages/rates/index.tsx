import { useEffect, useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
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
import { IRate, SortOrder } from "../../store/rates/types/rates-types";


export const Rates: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, total, loading } = useAppSelector(state => state.rates);

  const sortOrders: SortOrder[] = ['asc', 'desc'];
  const limitOrders = ['10', '25', '50', '100'];
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetching, setFetching] = useState<boolean>(true);

  const [page, setPage] = useState<number>(() => {
    const params = searchParams.get('page');
    return params ? Number(params) : 1;
  })
  const [limit, setLimit] = useState<string>(() => {
    const params = searchParams.get('limit');
    return params ? params : '10';
  })
  const [sort, setSort] = useState<SortOrder | string>(() => {
    const params = searchParams.get('sort');
    return params ? params : '';
  })

  const sortedList = sorted(list, {limit: Number(limit), page, sort});

  useEffect(() => {
    setSearchParams({page: String(page), limit, sort});
  }, [page, limit, sort])

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
        <List 
          list={sortedList} 
          renderItems={renders.item}
          onSelect={callbacks.onSelect}
        />
      </Spinner>
    </div>
  )
}