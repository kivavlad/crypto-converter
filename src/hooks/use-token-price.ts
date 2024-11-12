import { useState, useEffect } from "react";
import WebSocketService from "../config/tokens-ws";

export const useTokenPrice = (symbol: string) => {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (symbol) {
      const tokenService = new WebSocketService(symbol);

      tokenService.connectTokens((closePrice) => {
        setPrice(closePrice);
      })
      
      return () => tokenService.disconnect();
    } 
  }, [symbol])

  return {
    price,
  }
}