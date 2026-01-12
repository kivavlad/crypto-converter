import { SortOrder } from "../store/rates/types/rates-types";
import { IToken } from "../store/tokens/types";

interface IParams {
  limit: number;
  page: number;
  sort?: SortOrder | string;
}

export const sorted = (items: IToken[], params: IParams): IToken[] => {
  const {limit, page, sort} = params;

  const sortedItems = sort === 'asc' 
    ? [...items].sort((a, b) => Number(a.rank) - Number(b.rank)) 
    : sort === 'desc' 
      ? [...items].sort((a, b) => Number(b.rank) - Number(a.rank)) 
      : items;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return sortedItems.slice(startIndex, endIndex);
}
