import { memo, useState, useEffect } from "react";
import { useTokenPrice } from "../../hooks/use-token-price";
import { formatPrice } from "../../utils/format-price";
import type { IToken } from "../../store/tokens/types";
import cls from "./style.module.scss";

interface IProps {
  item: IToken;
}

export const CoinItem: React.FC<IProps> = memo(({ item }) => {
  const { price } = useTokenPrice({ _id: item.id });
  const [previousPrice, setPreviousPrice] = useState<string>(price);
  const [priceChangeClass, setPriceChangeClass] = useState<string>('');

  useEffect(() => {
    const currentPriceNum = parseFloat(price);
    const previousPriceNum = parseFloat(previousPrice);

    if (currentPriceNum < previousPriceNum) {
      setPriceChangeClass(cls.red);
    } else {
      setPriceChangeClass(cls.green);
    }

    setPreviousPrice(price);
    setTimeout(() => setPriceChangeClass(''), 800);
  }, [price, previousPrice])

  return (
    <div className={`${cls.coin_wrap} ${priceChangeClass}`}>
      <div className={cls.token}>
        <div className={cls.logo}>{item.symbol}</div>
        <span>{item.name}</span>
      </div>
      <div className={cls.price}>
        ${formatPrice(Number(price || item.priceUsd))}
      </div>
    </div>
  )
})