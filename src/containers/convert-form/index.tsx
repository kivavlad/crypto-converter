import { useState, useMemo } from "react";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useTokenPrice } from "../../hooks/use-token-price";
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
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    setAmount(cleanedValue);
  }

  const convert = useMemo(() => {
    if (!fromValue || !toValue || !amount) {
      return null;
    }

    if (!fromRate && !toRate) {
      return null;
    }

    if (fromValue === toValue) {
      setErrorSelect(true);
      return null;
    }

    const commission = Big(0.03);
    let resultWithCommission: string;
    let resultWithoutCommission: string;
    let commissionPercentage = commission.times(100).toString();
    
    const convertedAmount = Big(amount).times(Big(fromPrice)).div(Big(toPrice));
    const amountWithCommission = convertedAmount.times(Big(1).plus(commission));

    if (toRate && toRate.type === 'crypto') {
      resultWithCommission = amountWithCommission.toFixed(18);
      resultWithoutCommission = convertedAmount.toFixed(18);
    } else {
      resultWithCommission = amountWithCommission.toFixed(2);
      resultWithoutCommission = convertedAmount.toFixed(2);
    }
    
    setErrorSelect(false);

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
          <h4>{convert.resultWithCommission} {toValue}</h4>
          <p>
            ({convert.resultWithoutCommission} {toValue} + {convert.commissionPercentage}%)
          </p>
        </div>
      )}
    </div>
  )
}