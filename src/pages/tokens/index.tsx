import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from 'lodash/debounce';

import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useFilters } from '../../hooks/use-filters';

import { loadTokens } from "../../store/tokens/services/load-tokens";
import { tokensActions } from "../../store/tokens/slice/tokens-slice";
import { sessionActions } from "../../store/session/slice/session-slice";
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
import { SortOrder } from "../../store/rates/types/rates-types";
import cls from "./style.module.scss";
import { IToken } from "../../store/tokens/types";

const sortOrders: SortOrder[] = ['asc', 'desc'];
const limitOrders: string[] = ['10', '25', '50', '100'];

export const Tokens: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { list, total, loading, fetching } =
    useAppSelector((state) => state.tokens);

  const { page, limit, sort, search, setSearch, setPage, setLimit, setSort } =
    useFilters();

  const sortedList = sorted(list, { limit: Number(limit), page, sort});

  const [searchValue, setSearchValue] = useState(search);

  const handleChangeDebounce = useCallback(
    debounce((value: string) => setSearch(value), 600)
  , [setSearch]);

  const callbacks = {
    onReload: () => {
      dispatch(tokensActions.setFetching(true));
    },
    onLogout: () => {
      dispatch(sessionActions.signOut());
      navigate("/login");
    },
    onSelect: useCallback((token: IToken) => {
      dispatch(tokensActions.setSelected(token));
      dispatch(modalsActions.open('widget'));
    }, []),
    onChange: useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      handleChangeDebounce(value);
    }, [setSearchValue])
  }

  const renders = {
    item: useCallback((item: IToken) => {
      return <CoinItem item={item} />
    }, [])
  }

  useEffect(() => {
    dispatch(loadTokens({ search }));
  }, [fetching, search])

  return (
    <div className="container">
      <Head
        title="Tokens"
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
      <div className={cls.wrapper}>
        <Input
          type="search"
          value={searchValue}
          placeholder="Search coins"
          onChange={callbacks.onChange}
        />
        <Spinner active={loading}>
          <List<IToken>
            list={sortedList} 
            renderItems={renders.item}
            onSelect={callbacks.onSelect}
          />
        </Spinner>
      </div>
    </div>
  )
}