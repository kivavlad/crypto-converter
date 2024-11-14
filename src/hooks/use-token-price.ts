import { useState, useEffect } from "react";
import api from "../config/api";
import { IRate } from "../store/rates/types/rates-types";

interface IRateData {
  data: IRate;
  timestamp: number;
}

export const useTokenPrice = (_id: string) => {
  const [price, setPrice] = useState<string>('');

  const getTokenPrice = async (_id: string) => {
    const response = await api.get(`/rates/${_id}`);
    return await response.data as IRateData;
  }

  useEffect(() => {
    if (_id) {
      const fetchPrice = async () => {
        try {
          const response = await getTokenPrice(_id);
          setPrice(response.data.rateUsd);
        } catch (error) {
          console.error(error);
        }
      }

      fetchPrice();
      const interval = setInterval(fetchPrice, 32000);
      return () => clearInterval(interval);
    }
  }, [_id])

  return {
    price,
  }
}