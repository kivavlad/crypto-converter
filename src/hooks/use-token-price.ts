import { useState, useEffect } from "react";
import api from "../config/api";
import { IToken } from "../store/tokens/types";

interface IParams {
  _id: string,
  delay?: number
}

interface IResult {
  timestamp: number;
  data: IToken;
}

export const useTokenPrice = ({
  _id,
  delay = 32000
}: IParams) => {
  const [price, setPrice] = useState<string>('');

  const getTokenPrice = async (_id: string): Promise<IResult> => {
    const response = await api.get(`/assets/${_id}`);
    return await response.data;
  }

  useEffect(() => {
    if (_id) {
      const fetchPrice = async () => {
        try {
          const response = await getTokenPrice(_id);
          setPrice(response.data.priceUsd);
        } catch (error) {
          console.error(error);
        }
      }

      fetchPrice();
      const interval = setInterval(fetchPrice, delay);
      return () => clearInterval(interval);
    }
  }, [_id, delay]);

  return {
    price,
  }
}