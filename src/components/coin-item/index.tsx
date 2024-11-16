import { memo, useState, useEffect } from "react";
import { useTokenPrice } from "../../hooks/use-token-price";
import { IRate } from "../../store/rates/types/rates-types";
import cls from "./style.module.scss";

interface IProps {
  item: IRate;
}

export const CoinItem: React.FC<IProps> = memo(({ item }) => {
  const { price } = useTokenPrice(item.id);
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
    <div className={`${cls.coin_wrap} ${priceChangeClass || ''}`}>
      <div className={cls.token}>
        <div className={cls.logo}>{item.currencySymbol ?? ''}</div>
        <span>{item.symbol}</span>
      </div>
      <div className={cls.price}>
        ${Number(price || item.rateUsd).toFixed(18)}
      </div>
    </div>
  )
})