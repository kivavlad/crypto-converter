export interface IToken {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: unknown;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

export interface ITokensState {
  list: IToken[],
  total: number;
  selected: IToken | null;
  loading: boolean;
  fetching: boolean;
  error: string | null;
}

export interface ITokensResponse {
  data: IToken[];
  timestamp: number;
}