import { IRate, SortOrder } from "../store/rates/types/rates-types";

interface IParams {
  limit: number;
  page: number;
  sort?: SortOrder | string;
  search?: string;
}

export const sorted = (items: IRate[], params: IParams): IRate[] => {
  const {limit, page, sort, search} = params;
  const filteredItems = search
    ? items.filter(item =>
        item.id?.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol?.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  const sortedItems = sort === 'asc' 
    ? [...filteredItems].sort((a, b) => Number(a.rateUsd) - Number(b.rateUsd)) 
    : sort === 'desc' 
      ? [...filteredItems].sort((a, b) => Number(b.rateUsd) - Number(a.rateUsd)) 
      : filteredItems;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return sortedItems.slice(startIndex, endIndex);
}
