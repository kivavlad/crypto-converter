import { useState, useMemo } from "react";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useTokenPrice } from "../../hooks/use-token-price";
import { formatPrice } from "../../utils/format-price";
import { Select } from "../../components/select";
import { Input } from "../../components/input";
import { Arrows } from "../../components/svg/arrows";
import Big from "big.js";
import cls from "./style.module.scss";

export const ConvertForm: React.FC = () => {
  const { list, symbols } = useAppSelector(state => state.rates);

  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [errorSelect, setErrorSelect] = useState<boolean>(false); 

  const fromRate = list.find(item => item.symbol === fromValue) || null;
  const toRate = list.find(item => item.symbol === toValue) || null;
  const { price: fromPrice } = useTokenPrice(fromRate?.id ?? '');
  const { price: toPrice } = useTokenPrice(toRate?.id ?? '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    let cleanedValue = value.replace(/[^0-9.]/g, '');
    if (cleanedValue.startsWith('0') && cleanedValue.length > 1 && cleanedValue[1] !== '.') {
      cleanedValue = '0.' + cleanedValue.slice(1);
    }
  
    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      cleanedValue = parts[0] + '.' + parts.slice(1).join('');
    }

    setAmount(cleanedValue);
  }

  const convert = useMemo(() => {
    if (!fromValue || !toValue || !fromRate || !toRate || !amount || isNaN(Number(amount))) {
      return null;
    }

    if (fromValue === toValue) {
      setErrorSelect(true);
      return null;
    } else {
      setErrorSelect(false);
    }

    const commission = Big(0.03);
    let convertedAmount;
    let resultWithCommission: string;
    let resultWithoutCommission: string;
    let commissionPercentage = commission.times(100).toString();

    try {
      convertedAmount = Big(amount).times(Big(fromPrice)).div(Big(toPrice));
    } catch (error) {
      return null;
    }
    
    const amountWithCommission = convertedAmount.times(Big(1).plus(commission));

    resultWithCommission = amountWithCommission.toFixed(2);
    resultWithoutCommission = convertedAmount.toFixed(2);

    return {
      resultWithCommission,
      resultWithoutCommission,
      commissionPercentage,
    }
  }, [fromValue, toValue, amount, fromPrice, toPrice])

  return (
    <div className={cls.wrap}>
      <div className={cls.form}>
        <Select 
          options={symbols}
          theme='big'
          label="From"
          error={errorSelect}
          value={fromValue}
          onChange={setFromValue}
        />
        <Select 
          options={symbols}
          theme='big'
          label="To"
          error={errorSelect}
          value={toValue}
          onChange={setToValue}
        />
        <Input
          type='text'
          label="Amount"
          placeholder="0.00"
          value={amount}
          onChange={handleChange}
        />
      </div>

      {convert && (
        <div className={cls.result}>
          <h3>{amount} {fromValue}</h3>
          <Arrows/>
          <h4>{formatPrice(+convert.resultWithCommission)} {toValue}</h4>
          <p>
            (
              {formatPrice(+convert.resultWithoutCommission)} {toValue} + 
              {formatPrice(+convert.commissionPercentage)}%
            )
          </p>
        </div>
      )}
    </div>
  );
};
