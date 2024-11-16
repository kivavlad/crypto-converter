import { IRate, SortOrder } from "../store/rates/types/rates-types";

interface IParams {
  limit: number;
  page: number;
  sort?: SortOrder | string;
}

export const sorted = (items: IRate[], {limit, page, sort}: IParams): IRate[] => {
  const sortedItems = sort === 'asc' 
    ? [...items].sort((a, b) => Number(a.rateUsd) - Number(b.rateUsd)) 
    : sort === 'desc' 
      ? [...items].sort((a, b) => Number(b.rateUsd) - Number(a.rateUsd)) 
      : items;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return sortedItems.slice(startIndex, endIndex);
}