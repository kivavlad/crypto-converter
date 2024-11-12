export interface IRate {
  id: string;
  symbol: string;
  currencySymbol: string;
  type: string;
  rateUsd: string;
}

export interface IRatesResponse {
  data: IRate[];
  timestamp: number;
}