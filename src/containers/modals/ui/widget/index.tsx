import { useAppDispatch } from "../../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../../hooks/use-app-selector";
import { modalsActions } from "../../../../store/modals/slice/modals-slice";
import { Overlay } from "../../../../components/overlay";
import { TradingviewWidget } from "../../../../components/tradingview-widget";

export const Widget: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentRate } = useAppSelector(state => state.rates);

  const callbacks = {
    onClose: () => dispatch(modalsActions.close()),
  }

  return (
    <Overlay onClose={callbacks.onClose}>
      <TradingviewWidget currentSymbol={currentRate.symbol}/>
    </Overlay>
  )
}