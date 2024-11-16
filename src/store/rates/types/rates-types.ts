export type SortOrder = 'asc' | 'desc';
export type RateType = 'crypto' | 'fiat';

export interface IRate {
  id: string;
  symbol: string;
  currencySymbol: string;
  type: RateType;
  rateUsd: string;
}

export interface IRatesResponse {
  data: IRate[];
  timestamp: number;
}