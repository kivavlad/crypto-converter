import { memo } from "react";
import { useTokenPrice } from "../../hooks/use-token-price";
import { IRate } from "../../store/rates/types/rates-types";
import cls from "./style.module.scss";

interface IProps {
  item: IRate;
}

export const CoinItem: React.FC<IProps> = memo(({ item }) => {
  const { price } = useTokenPrice(item.symbol);

  return (
    <div className={cls.coin_wrap}>
      <div className={cls.token}>
        <div className={cls.logo}>{item.currencySymbol ?? ''}</div>
        <span>{item.symbol}</span>
      </div>
      <div className={cls.price}>
        ${price}
      </div>
    </div>
  )
})